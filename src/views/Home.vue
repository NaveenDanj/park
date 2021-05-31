<template>
  <v-form>
  <v-row justify="center" class="mt-10">
      <v-col v-if="!loading" cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
          
          <v-toolbar flat color="purple">
            <v-icon class="white--text">mdi-account</v-icon>
            <v-toolbar-title class="font-weight-light white--text ml-3">
              Employee Login
            </v-toolbar-title>
          </v-toolbar>

          

          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="[() => !!email || 'This field is required']"
              label="Email"
              placeholder="johndoe@gmail.com"
              required
            ></v-text-field
            ><br />

            <v-text-field
              v-model="password"
              autocomplete
              type="password"
              :rules="[() => !!password || 'This field is required']"
              label="Password"
              placeholder="John Doe"
              required
            ></v-text-field>

            <!-- <v-text-field
            ref="address"
            v-model="address"
            :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
              addressCheck
            ]"
            label="Address Line"
            placeholder="Snowy Rock Pl"
            counter="25"
            required
          ></v-text-field> -->
          </v-card-text>

          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn class="ma-2" outlined color="warning" large>Cancel</v-btn>

            <v-spacer></v-spacer>

            <v-btn class="ma-2" outlined color="success" large @click="submit"
              >Login</v-btn
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
      email: "",
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
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          let user = userCredential.user;
          console.log(user);
          this.$router.push("/dashemp");
        })
        .catch((error) => {
          var errorMessage = error.message;
          this.show = true;
          this.message = errorMessage;
        });
    },

    handleOK() {
      this.show = false;
    },
  },
};
</script>
