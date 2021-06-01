<template>
  <div>
    <div v-if="loading">
      <h4>Loading...</h4>
    </div>

    <v-row v-else justify="center" class="mt-10">
      <v-col cols="12" sm="10" md="8" lg="10">
        <v-card>
          <v-tabs
            background-color="blue"
            class="white--text"
            color="deep-purple accent-4"
            right
            
          >
            <v-card-title> All Vehicle Details </v-card-title>

            <v-spacer></v-spacer>

            <v-tab>All Vehicles</v-tab>
            <v-tab>Change status</v-tab>
            <v-tab>Complete Acess</v-tab>

            <v-tab-item>

              

                <v-select
                  :items="['All' , 'Available' , 'Unavailable']"
                  label="Filter By"
                  v-model="filter_type"
                  outlined
                  class="mt-5 ml-5 mr-5"
                  @change="filterItems"
                ></v-select>

               

             

              <v-card
                v-for="(item, index) in this.item_list"
                :key="index"
                color="#385F73"
                dark
                class="ma-5"
              >
                <v-card-title class="headline"
                  >{{ item.fname }} {{ item.lname }}</v-card-title
                >

                <v-card-subtitle class="mt-5">
                  <h3>Status : {{ item.status }}</h3>
                  <h3>Category : {{ item.type }}</h3>
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn text>Time : {{ new Date(item.time.seconds) }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

            <v-tab-item> ASD </v-tab-item>

            <v-tab-item> ASD </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  components: {},

  created() {
    this.item_list = [];

    firebase
      .firestore()
      .collection("access_list")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.item_list.push(doc.data());
        });
      });

      firebase
      .firestore()
      .collection("access_list")
      .onSnapshot((newSnap) => {
        this.item_list = [];
        newSnap.forEach((doc) => {
          this.item_list.push(doc.data());
        });
      });
  },

  data() {
    return {
      loading: false,
      item_list: [],
      filter_type : '',
    };
  },

  methods: {

    async filterItems(){

      if(this.filter_type == 'All'){

        this.item_list = [];

        firebase
        .firestore()
        .collection("access_list")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.item_list.push(doc.data());
          });
        });

      }else{
        this.item_list = [];
        let data = await firebase.firestore().collection("access_list").where("status" , "==" , this.filter_type)
        console.log(data.data());
        data.forEach(doc => {
          this.item_list.push(doc.data());
        })

        
        
      }

      
    }


  },
};
</script>