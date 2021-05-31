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
        Access A Vehicle</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn color="purple darken-3" fab small @click="isEditing = !isEditing">
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="fname"
            :rules="[() => !!fname || 'This field is required']"
            :disabled="!isEditing"
            color="white"
            label="First Name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="lname"
            :rules="[() => !!fname || 'This field is required']"
            :disabled="!isEditing"
            color="white"
            label="Last Name"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-autocomplete
        :disabled="!isEditing"
        v-model="type"
        :items="vehicle_list"
        color="white"
        item-text="name"
        label="Vehicle Type"
      ></v-autocomplete>

      <v-autocomplete
        :disabled="!isEditing"
        v-model="status"
        :items="status_list"
        color="white"
        item-text="name"
        label="Status"
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :disabled="!isEditing" color="warning" x-large @click="cancel">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isEditing" color="success" x-large @click="save">
        Submit
      </v-btn>
    </v-card-actions>

    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
      New Access Vehicle Created
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
    this.vehicle_list = [];
    this.status_list = [];

    firebase
      .firestore()
      .collection("vehicle_type")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.vehicle_list.push(doc.data().name);
        });
      })
      .catch((err) => console.log(err));

    firebase
      .firestore()
      .collection("vehicle_type")
      .onSnapshot((newSnap) => {
        newSnap.forEach((doc) => {
          this.vehicle_list.push(doc.data().name);
        });
      });

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
      model: null,
      status_list: [],
      vehicle_list: [],

      fname: "",
      lname: "",
      type: null,
      status: null,
      show : false,
      message : '',
    };
  },

  methods: {

    save() {

      if (this.fname == "" || this.lname == "" || this.type == null || this.status == null){
        this.show = true;
        this.message = 'Please Fill all the fields';
      }else{
        
        firebase.firestore().collection('access_list').doc(this.fname +'_' + this.lname).get()
        .then(check => {
            if(check.exists){
                this.show = true;
                this.message = 'Please Finish your last access'; 
            }else{
                firebase.firestore().collection('access_list').doc(this.fname +'_' + this.lname).set({
                    fname : this.fname,
                    lname : this.lname,
                    status : this.status,
                    time : new Date(Date.now()),
                    type : this.type
                })
                .then(() => {
                    console.log("Document successfully written!");
                    this.show = true;
                    this.message = 'Your Vehicle Data Saved!';
                    this.isEditing = !this.isEditing;
                    this.hasSaved = true;
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
        });

        
      }
        
    },

    handleOK(){
        this.show = false;
    },

    cancel() {
      this.fname = '';
      this.lname = '';
      this.status = null;
      this.type = null;
    },
  },
};
</script>