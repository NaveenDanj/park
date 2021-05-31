<template>
  <v-card
    class="overflow-hidden"
    min-height="500"
    color="purple lighten-1"
    dark
  >
    <v-toolbar flat color="purple">
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light ml-3">
        Change Status</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn color="purple darken-3" fab small @click="isEditing = !isEditing">
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="fname"
            @keydown="key_change"
            :rules="[() => !!fname || 'This field is required']"
            :disabled="!isEditing"
            color="white"
            label="First Name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lname"
            @keydown="key_change"
            :rules="[() => !!fname || 'This field is required']"
            :disabled="!isEditing"
            color="white"
            label="Last Name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
            <v-btn :disabled="!isEditing" color="success" class="mb-2" @click="add_user">
                Add User
            </v-btn>
        </v-col>


      </v-row>

      <v-autocomplete
        :disabled="!isEditing || !found"
        v-model="status"
        :items="status_list"
        color="white"
        item-text="name"
        label="Status"
      ></v-autocomplete>

    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :disabled="!isEditing  " color="warning" x-large @click="cancel">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isEditing || !found" color="success" x-large @click="save">
        Submit
      </v-btn>
    </v-card-actions>

    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
      Access Data has been updated
    </v-snackbar>

    <AlertBox :show="show" @clickOK="handleOK" :showError="message" />
  </v-card>
</template>

<script>
import firebase from "firebase";
import AlertBox from "../DialogBox/Alertbox.vue";

export default {
  components: {
    AlertBox,
  },

  created() {
    this.status_list = [];

    firebase
      .firestore()
      .collection("status")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.status_list.push(doc.data().name);
        });
      });
  },

  data() {
    return {
      loading: true,
      hasSaved: false,
      isEditing: null,
      found : false,
      model: null,
      status_list: [],

      fname: "",
      lname: "",
      status: null,
      show : false,
      message : '',
    };
  },

  methods: {

    save() {

      if (this.fname == "" || this.lname == "" || this.status == null){
        this.show = true;
        this.message = 'Please Fill all the fields';
      }else{
        
        firebase.firestore().collection('access_list').doc(this.fname + '_' + this.lname).update({
            status : this.status
        })
        .then(() => {
            this.show = true;
            this.message = 'Access Status Updated Successfully!';
            this.isEditing = !this.isEditing;
            this.hasSaved = true;
            this.cancel();
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });


      }
        
    },

    add_user(){
        if (this.fname == "" || this.lname == "" ){
            this.show = true;
            this.message = 'Please Fill all the fields';
        }else{
            
            firebase.firestore().collection('access_list').doc(this.fname + '_' + this.lname).get()
            .then(doc => {
                if(doc.exists){

                    this.fname = doc.data().fname;
                    this.lname = doc.data().lname;
                    this.found = true;

                    this.show = true;
                    this.message = 'Access Data Found';


                }else{
                    this.show = true;
                    this.message = 'No Access Data regarding this user!';
                }
            })

        }
    },

    key_change(){
        this.found = false;
        this.status = null;
    },

    handleOK(){
        this.show = false;
    },

    cancel() {
      this.fname = '';
      this.lname = '';
      this.status = null;
    },
  },
};
</script>