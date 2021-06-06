<template >
  <div @click="checkLogin">
    <div v-if="loading">
      <h4>Loading...</h4>
    </div>

    <v-row v-else justify="center" class="mt-10">
      <v-col cols="12" sm="10" md="8" lg="10">
        <v-card>
          <AccessVehicle/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import firebase from "firebase";
import AccessVehicle from "../components/DashboardEmp/AccessVehicle.vue";
// import ChangeStatus from "../components/DashboardEmp/ChnageStatus.vue";
// import CompleteAccess from "../components/DashboardEmp/CompleteAccess.vue";

export default {
  components: {
    AccessVehicle,
    // ChangeStatus,
    // CompleteAccess
  },

  beforeUpdate(){
    console.log('done');
  },

  updated(){
    console.log('nn');
    if(this.$store.state.currentUser.logout_time != null){
      if(Date.now() > this.$store.state.currentUser.logout_time){
        this.$store.state.currentUser.username = '';
        this.$store.state.currentUser.login_time = null;
        this.$store.state.currentUser.logout_time = null;

        this.$router.push("/");
      }
    }else{
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
    };
  },

  methods: {

    checkLogin(){
      if(this.$store.state.currentUser.logout_time != null){
        if(Date.now() > this.$store.state.currentUser.logout_time){
          this.$store.state.currentUser.username = '';
          this.$store.state.currentUser.login_time = null;
          this.$store.state.currentUser.logout_time = null;

          this.$router.push("/");
        }
      }else{
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

    if(this.$store.state.currentUser.username != ''){
      this.loading = false;
    }else{
      this.$router.push("/");
    }


  },
};
</script>