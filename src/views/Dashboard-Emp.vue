<template >
  <div @click="checkLogin">
    <div v-if="loading">
      <h4>Loading...</h4>
    </div>

    <v-row v-else justify="center" class="mt-4">

      <v-col cols="12" sm="10" md="4" lg="10">

        <!-- <marquee width="100%" behavior="scroll" direction="left" height="100px">
          <label v-for="(part , index) in slides" :key="index">
            {{part + " ... "}}
          </label>
        </marquee> -->
<!-- 
        <v-carousel
          cycle
          height="200"
          hide-delimiter-background
          show-arrows-on-hover
          hide-delimiters
          :show-arrows="false"
          :interval="3000"
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="red" height="200">
              <v-row class="fill-height" align="center" justify="center">

                <v-card class="mx-auto" color="#26c6da" dark width="900">
                  <v-card-title>
                    <v-icon large left> mdi-alert  </v-icon>
                    <span class="title font-weight-light">System Alerts</span>
                  </v-card-title>

                  <v-card-text class="headline font-weight-bold">
                    <center>{{slide}}</center>
                  </v-card-text>

                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-list-item-avatar color="grey darken-3">
                        <v-icon  > mdi-account-cog   </v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Message by Entuza Digital</v-list-item-title>
                      </v-list-item-content>

                      
                    </v-list-item>
                  </v-card-actions>
                </v-card>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel> -->
      </v-col>

      <v-col cols="12" sm="10" md="8" lg="10">
        <v-card>
          <AccessVehicle />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import AccessVehicle from "../components/DashboardEmp/AccessVehicle.vue";
// import ChangeStatus from "../components/DashboardEmp/ChnageStatus.vue";
// import CompleteAccess from "../components/DashboardEmp/CompleteAccess.vue";

export default {
  components: {
    AccessVehicle,
    // ChangeStatus,
    // CompleteAccess
  },

  beforeUpdate() {
    console.log("done");
  },

  updated() {
    console.log("nn");
    if (this.$store.state.currentUser.logout_time != null) {
      if (Date.now() > this.$store.state.currentUser.logout_time) {
        this.$store.state.currentUser.username = "";
        this.$store.state.currentUser.fname = "";
        this.$store.state.currentUser.lname = "";
        this.$store.state.currentUser.login_time = null;
        this.$store.state.currentUser.logout_time = null;

        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
  },

  data() {
    return {
      loading: true,
      hasSaved: false,
      isEditing: null,
      model: null,
      states: [],

      slides: [],
    };
  },

  methods: {
    checkLogin() {
      if (this.$store.state.currentUser.logout_time != null) {
        if (Date.now() > this.$store.state.currentUser.logout_time) {
          this.$store.state.currentUser.fname = "";
          this.$store.state.currentUser.lname = "";
          this.$store.state.currentUser.username = "";
          this.$store.state.currentUser.login_time = null;
          this.$store.state.currentUser.logout_time = null;

          this.$router.push("/");
        }
      } else {
        this.$router.push("/");
      }
    },

    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },

    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },

    cancel() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },
  },

  created() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     let uid = user.uid;
    //     console.log(uid);
    //     this.loading = false;
    //   } else {
    //     this.$router.push("/");
    //   }
    // });

    firebase
      .firestore()
      .collection("news")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.slides.push(doc.data().news);
        });
      });

    if (this.$store.state.currentUser.username != "") {
      this.loading = false;
    } else {
      this.$router.push("/");
    }
  },
};
</script>