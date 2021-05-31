<template>
  <div>
    <div v-if="loading">
      <h4>Loading...</h4>
    </div>

    <v-row v-else justify="center" class="mt-10">
      <v-col cols="12" sm="10" md="8" lg="10">
        <v-card>
          <v-tabs background-color="blue" class="white--text" color="deep-purple accent-4" right>
            <!-- <v-card-title> Employee Controle </v-card-title> -->

            <v-spacer></v-spacer>

            <v-tab>Access Vehicle</v-tab>
            <v-tab>Change status</v-tab>
            <v-tab>Complete Acess</v-tab>

            <v-tab-item> 
                <AccessVehicle/>
            </v-tab-item>

            <v-tab-item > 
                <ChangeStatus/>
            </v-tab-item>

            <v-tab-item > 
                <CompleteAccess/>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import AccessVehicle from "../components/DashboardEmp/AccessVehicle.vue";
import ChangeStatus from "../components/DashboardEmp/ChnageStatus.vue";
import CompleteAccess from "../components/DashboardEmp/CompleteAccess.vue";

export default {
  components: {
    AccessVehicle,
    ChangeStatus,
    CompleteAccess
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        console.log(uid);
        this.loading = false;
      } else {
        this.$router.push("/");
      }
    });
  },
};
</script>