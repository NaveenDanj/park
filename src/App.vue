<template>
  <v-app>
    <div v-if="!loading">
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-toolbar-title>Vehicle Management System</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon large class="mr-5" @click="employee">
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-btn icon large @click="adminlogin" class="mr-5">
          <v-icon>mdi-account-key </v-icon>
        </v-btn>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list style="width: 200px">
            <v-list-item @click="true">
              <v-list-item-title>About</v-list-item-title>
            </v-list-item>

            <v-list-item v-if="logged_in" @click="handleSignOut">
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <Drawer />
      </v-app-bar>
    </div>

    <v-main>
      <router-view />
    </v-main>

    <v-footer>
      <a href="https://www.entuza.com" target="blank">Entuza</a>
      <v-spacer></v-spacer>
      <div>
        &copy; {{ new Date().getFullYear() }} Solution By Entuza Digital
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
import Drawer from "../src/components/Navigation/Drawer";

export default {
  name: "App",

  components: {
    Drawer,
  },

  data: () => ({
    drawer: false,
    loading: true,
    logged_in: false,
  }),

  updated(){
    
    if(this.$store.state.currentUser.logout_time != null){
      if(Date.now() > this.$store.state.currentUser.logout_time){
        console.log('logout');
        this.$store.state.currentUser.username = '';
        this.$store.state.currentUser.login_time = null;
        this.$store.state.currentUser.logout_time = null;
      }
    }
  
  },

  created() {
    if (this.$store.state.currentUser.username != '') {
      this.logged_in = true;
    }
    this.loading = false;
  },

  methods: {
    employee() {
      this.$router.push("/");
    },

    adminlogin() {
      this.$router.push("/adminlogin");
    },

    handleSignOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.logged_in = false;
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
