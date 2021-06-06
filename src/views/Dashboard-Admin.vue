<template>
  <div @click="checkLogin">
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

            <v-spacer></v-spacer>

            <v-tab>All Vehicles</v-tab>
            <v-tab>Manage Status</v-tab>
            <v-tab>Add New Type</v-tab>

            <v-tab-item>

              

              <v-select
                :items="status_list"
                label="Filter By Status"
                v-model="filter_type"
                outlined
                class="mt-5 ml-5 mr-5"
                @change="filterItems"
              ></v-select>

              <v-btn color="red" x-large @click="ask_sure" class="ml-5 mb-3 mr-5 white--text">
                Remove
              </v-btn>

              <v-btn color="teal" x-large @click="merge" class="ml-2 mr-5 mb-3 white--text">
                Merge
              </v-btn>


              <v-card
                v-for="(item, index) in this.item_list"
                :key="index"
                color="#385F73"
                dark
                class="ma-5"
              >

                <div v-if="!item.merge" >

                  <v-card-title  class="headline">  {{ item.fname }} {{ item.lname }}
                    <v-spacer></v-spacer>
                    <v-checkbox
                      v-model="selected"
                      :value="item.fname +'_' + item.lname"
                      ></v-checkbox>
                  </v-card-title>

                  <v-card-subtitle class="mt-0">
                    <h3>Status : {{ item.status }}</h3>
                    <h3>Category : {{ item.type }}</h3>
                  </v-card-subtitle>

                  <v-card-actions>
                    <v-btn text>Date - Time : {{ item.time }}</v-btn>
                  </v-card-actions>

                </div>

                <div v-else>

                  <v-row>
                    <v-col cols="12" md="6">

                      <v-card-title  class="headline">  {{ item.name1 }} 
                        <v-spacer></v-spacer>
                      </v-card-title>

                      <v-card-subtitle class="mt-0">
                        <h3>Status : {{ item.status1 }}</h3>
                        <h3>Category : {{ item.type1 }}</h3>
                      </v-card-subtitle>

                      <v-card-actions>
                        <v-btn text>Date - Time : {{ item.time }}</v-btn>
                      </v-card-actions>

                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card-title  class="headline">  {{ item.name2 }}
                      <v-spacer></v-spacer>

                      <v-checkbox
                      v-model="selected"
                      :value="item.name1 +'_' + item.name2"
                      ></v-checkbox>
                      
                      </v-card-title>

                      <v-card-subtitle class="mt-0">
                        <h3>Status : {{ item.status2 }}</h3>
                        <h3>Category : {{ item.type2 }}</h3>
                      </v-card-subtitle>

                      <v-card-actions>
                        <v-btn text>Date - Time : {{ item.time }}</v-btn>
                      </v-card-actions>
                    </v-col>



                  </v-row>

                </div>

              </v-card>
            </v-tab-item>

            <v-tab-item>
              <ManageStatus />
            </v-tab-item>

            <v-tab-item>
              <ManageTypes />
            </v-tab-item>

            
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <AlertBox :show="alertshow" @clickOK="handleOK" :showError="message" />

    <Comfirm :show="show" @results="handleDelete" />

  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

import Comfirm from '../components/DialogBox/Comfirm.vue'
import AlertBox from '../components/DialogBox/Alertbox.vue'

import ManageStatus from '../components/DashboardAdmin/ManageStatus.vue'
import ManageTypes from '../components/DashboardAdmin/ManageTypes.vue'

export default {
  components: {
    Comfirm,
    AlertBox,
    ManageStatus,
    ManageTypes
  },

  created() {

    if(this.$store.state.currentAdmin.username != ''){
      this.loading = false;
    }else{
      this.$router.push("/");
    }


    this.item_list = [];

    firebase
      .firestore()
      .collection("status")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.status_list.push(doc.data().name);
        });

        this.loading = false;

      });


    firebase
      .firestore()
      .collection("access_list")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.item_list.push(doc.data());
        });

        this.loading = false;

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
      loading: true,
      item_list: [],
      filter_type : '',
      selected : [],
      status_list : ['All'],
      merge_list : [],

      alertshow : false,
      message : '',

      show : false,

    };
  },

  methods: {

    checkLogin(){
      if(this.$store.state.currentAdmin.logout_time != null){
        if(Date.now() > this.$store.state.currentAdmin.logout_time){
          this.$store.state.currentAdmin.username = '';
          this.$store.state.currentAdmin.login_time = null;
          this.$store.state.currentAdmin.logout_time = null;

          this.$router.push("/adminlogin");
        }
      }else{
        this.$router.push("/adminlogin");
      }
    },

    handleOK(){
      this.alertshow = false;
    },

    ask_sure(){
      if(this.selected.length > 0){
        this.show = true;
      }
    },

    merge(){

      if(this.selected.length == 2){
        
        let card_data = [];

          
        firebase.firestore().collection('access_list').doc(this.selected[0]).get()
        .then(doc => {
          card_data.push(doc.data());

          firebase.firestore().collection('access_list').doc(this.selected[1]).get()
          .then(doc2 =>{
            card_data.push(doc2.data());

            this.doMerge(card_data);

          })

        })

      }else{
        this.alertshow = true;
        this.message = "Please select only 2 Status Cards to merge!";
      }

    },

    doMerge(card_data){
      console.log('do merge')
      let newCard = {};
      newCard.name1 = card_data[0].fname + " " + card_data[0].lname;
      newCard.name2 = card_data[1].fname + " " + card_data[1].lname;
      newCard.status1 = card_data[0].status;
      newCard.status2 = card_data[1].status;
      newCard.type1 = card_data[0].type;
      newCard.type2 = card_data[1].type;
      newCard.time = this.get_today_date() + " " + this.get_today_time();
      newCard.merge = true;

      firebase.firestore().collection('access_list').doc(this.selected[0]).delete()
      .then(() => {

      firebase.firestore().collection('access_list').doc(this.selected[1]).delete()
      .then(() => {

        firebase.firestore().collection('access_list').doc(newCard.name1 + "_" + newCard.name2).set(newCard)
        .then(() => {
          this.alertshow = true;
          this.message = "Merge Successfully";
        })
        .catch(err => console.log(err));

      })
      .catch(err => console.log(err))

      })
      .catch(err => console.log(err))

    },


    get_today_date(){

      const d = new Date();
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().length == 2 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1).toString();
      const date = d.getDate();
      return year.toString() + "-" + month + "-" + date.toString();

    },

    get_today_time(){
      const today = new Date();
      let mins;
      let seconds = today.getSeconds().toString();

      if(today.getMinutes().toString().length < 2){
          mins =  "0" + today.getMinutes().toString();
      }else{
          mins = today.getMinutes().toString();
      }

      if(seconds.length < 2){
          seconds = '0' + today.getSeconds().toString();
      }

      return today.getHours() + ":" + mins + ":" + seconds;

    },


    handleDelete(res){

      console.log('merge data ' ,  this.selected);
      
      if(res){
        this.selected.forEach(card => {
          this.deleteItem(card)
        })
      }

      this.show = false;

    },


    filterItems(){

      if(this.filter_type == 'All'){

        this.item_list = [];

        this.loading = true;

        firebase
        .firestore()
        .collection("access_list")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.item_list.push(doc.data());
          });

          this.loading = false;
        });

      }else{
        this.item_list = [];
        this.loading = true;
        firebase.firestore().collection("access_list").where("status" , "==" , this.filter_type)
        .get()
        .then(snap =>{
          snap.forEach(doc => {
            this.item_list.push(doc.data());
          });

          this.loading = false;
        });
        

        
        
      }

      
    },

    deleteItem(id){

      this.item_list = [];

      firebase.firestore().collection('access_list').doc(id).delete()
      .then(() =>{
        
        console.log('deleted!');

      })
    }


  },
};
</script>