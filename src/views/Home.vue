<template >
  <v-form>
  <v-row @keydown.enter="login" justify="center" class="mt-10">
      <v-col v-if="!loading" cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
          
          <v-toolbar flat color="#0036d9">
            <v-icon class="white--text">mdi-account</v-icon>
            <v-toolbar-title class="font-weight-light white--text ml-3">
              Inlogen
            </v-toolbar-title>
          </v-toolbar>

          

          <v-card-text>
            <v-text-field
              v-model="username"
              :rules="[() => !!username || 'Verplicht in tevullen']"
              label="Gebruikersnaam"
              placeholder="John Doe"
              @keydown.enter="login"
              required
            ></v-text-field
            ><br />

            <v-text-field
              v-model="password"
              autocomplete
              type="password"
              :rules="[() => !!password || 'Verplicht in tevullen']"
              label="Wachtwoord"
              placeholder="password"
              @keydown.enter="login"
              required
            ></v-text-field>

            
          </v-card-text>

          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn class="ma-2" outlined color="warning" @click="clear" large>Annuleren</v-btn>

            <v-spacer></v-spacer>

            <v-btn class="ma-2" outlined color="success" large @click="login"
              >Inloggen</v-btn
            >



          </v-card-actions>

          <AlertBox :show="show" :showError="message" @clickOK="handleOK" />
        </v-card>

      </v-col>

  </v-row>
  </v-form>

</template>

<script>
import firebase from "firebase";
import AlertBox from "../components/DialogBox/Alertbox.vue";

export default {
  components: {
    AlertBox,
  },

  name: "Home",

  data() {
    return {
      username: "",
      password: "",
      show: false,
      message: "",
      loading: true,
    };
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        console.log(uid);
        this.$router.push("/dashemp");
      }

      this.loading = false;
    });
  },

  methods: {

    clear(){
      this.username = '';
      this.password = '';
    },

    login(){

      if(this.password == '' || this.username == ''){
        this.show = true;
        this.message = 'Fields cannot be empty';
      }else{

        console.log('the data is ' , this.username , this.password);

        firebase.firestore().collection('users').doc(this.username).get()
        .then(doc => {

          console.log('the data is ' , doc);

          if(doc.data().username == this.username && doc.data().password == this.password){
           

            let now_timestamp = Date.now();
            let expire_timestamp = now_timestamp + (1000 * 60 * 30 );

            console.log(now_timestamp , expire_timestamp);

            this.$store.state.currentUser.username = this.username;
            this.$store.state.currentUser.fname = doc.data().fname;
            this.$store.state.currentUser.lname = doc.data().lname;
            this.$store.state.currentUser.login_time = now_timestamp;
            this.$store.state.currentUser.logout_time = expire_timestamp;

            this.show = true;
            this.message = 'You are logged in!';

            this.$router.push("/dashemp");

          }else{

            this.show = true;
            this.message = 'Username or password is incorrect!';

          }

        })
        .catch(() => {
          this.show = true;
          this.message = 'Username or password is incorrect!';
        })

      }

    },

    handleOK() {
      this.show = false;
    },
  },
};
</script>
