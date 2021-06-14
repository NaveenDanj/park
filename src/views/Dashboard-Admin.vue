<template>
  <div @click="checkLogin">
    <div v-if="loading">
      <h4>Loading...</h4>
    </div>

    <v-row v-else justify="center" class="mt-5">
      <v-col cols="12" sm="12" md="1" lg="12">
        <v-carousel
          cycle
          height="100%"
          hide-delimiter-background
          show-arrows-on-hover
          hide-delimiters
          :show-arrows="false"
          :interval="3000"
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet height="200">
              <v-row class="fill-height" align="center" justify="center">
                <v-card class="mx-auto" color="#26c6da" dark width="900">
                  <v-card-title>
                    <v-icon large left> mdi-alert </v-icon>
                    <span class="title font-weight-light">System Alerts</span>
                  </v-card-title>

                  <v-card-text class="headline font-weight-bold">
                    <center>{{ slide }}</center>
                  </v-card-text>

                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-list-item-avatar color="grey darken-3">
                        <v-icon> mdi-account-cog </v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          >Message by Entuza Digital</v-list-item-title
                        >
                      </v-list-item-content>

                      <!-- <v-row align="center" justify="end">
                        <v-icon class="mr-1">mdi-heart</v-icon>
                        <span class="subheading mr-2">256</span>
                        <span class="mr-1">·</span>
                        <v-icon class="mr-1">mdi-share-variant</v-icon>
                        <span class="subheading">45</span>
                      </v-row> -->
                    </v-list-item>
                  </v-card-actions>
                </v-card>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="12" sm="10" md="8" lg="10">
        <v-card>
          <v-tabs background-color="#0036D9" class="white--text" right>
            <v-spacer></v-spacer>

            <v-tab class="white--text">Alle voertuigen</v-tab>
            <v-tab class="white--text">Nieuwe Status</v-tab>
            <v-tab class="white--text">Nieuwe voertuig</v-tab>
            <v-tab class="white--text">Manage Users</v-tab>

            <v-tab-item>
              <v-select
                :items="status_list"
                label="Filter op Status"
                v-model="filter_type"
                outlined
                class="mt-5 ml-5 mr-5"
                @change="filterItems"
              ></v-select>

              <v-select
                :items="vehicle_list"
                label="Filter op Vehicle Type"
                v-model="vehicle_type"
                outlined
                class="ml-5 mr-5"
                @change="filterItemsType"
              ></v-select>

              <v-btn
                color="red"
                x-large
                @click="ask_sure"
                class="ml-5 mb-3 mr-5 white--text"
              >
                Remove
              </v-btn>

              <v-btn
                color="teal"
                x-large
                @click="merge"
                class="ml-2 mr-5 mb-3 white--text"
              >
                Merge
              </v-btn>

              <v-btn
                color="teal"
                x-large
                @click="refresh_data"
                class="ml-2 mr-5 mb-3 white--text"
                >
                  Refresh
              </v-btn>
              

              <v-card
                v-for="(item, index) in this.item_list"
                :key="index"
                color="#385F73"
                dark
                class="ma-5"
              >
                <div v-if="!item.merge">
                  <v-card-title >
                    <p style="font-family : 'roboto'; font-size : 12 " >{{ item.fname }} {{ item.lname }}</p>
                    <v-spacer></v-spacer>
                    <v-checkbox
                      v-model="selected"
                      :value="item.fname + '_' + item.lname"
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
                      <v-card-title class="headline">
                        <p style="font-family : 'roboto'; font-size : 12 " >{{ item.name1 }}</p>
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
                      <v-card-title class="headline">
                        <p style="font-family : 'roboto'; font-size : 12 " >{{ item.name2 }}</p>
                        <v-spacer></v-spacer>

                        <v-checkbox
                          v-model="selected"
                          :value="item.name1 + '_' + item.name2"
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

            <v-tab-item>
              <ManageUsers />
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
import firebase from "firebase/app";
import "firebase/firestore";

import Comfirm from "../components/DialogBox/Comfirm.vue";
import AlertBox from "../components/DialogBox/Alertbox.vue";

import ManageStatus from "../components/DashboardAdmin/ManageStatus.vue";
import ManageTypes from "../components/DashboardAdmin/ManageTypes.vue";
import ManageUsers from "../components/DashboardAdmin/AddNewUser.vue";

export default {
  components: {
    Comfirm,
    AlertBox,
    ManageStatus,
    ManageTypes,
    ManageUsers,
  },

  created() {

    firebase
      .firestore()
      .collection("news")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.slides.push(doc.data().news);
        });
      });

    if (this.$store.state.currentAdmin.username != "") {
      this.loading = false;
    } else {
      this.$router.push("/");
    }

    firebase
      .firestore()
      .collection("vehicle_type")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.vehicle_list.push(doc.data());
        });
      });

    firebase
      .firestore()
      .collection("vehicle_type")
      .onSnapshot((snap) => {
        this.vehicle_list = ["All"];

        snap.forEach((item) => {
          this.vehicle_list.push(item.data().name);
        });
      });

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
      filter_type: "",
      selected: [],
      status_list: ["All"],
      merge_list: [],
      vehicle_list: ["All"],
      vehicle_type: null,

      slides : [],

      alertshow: false,
      message: "",

      show: false,
    };
  },

  methods: {

    refresh_data(){

      this.item_list = [];

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
    },

    checkLogin() {
      if (this.$store.state.currentAdmin.logout_time != null) {
        if (Date.now() > this.$store.state.currentAdmin.logout_time) {
          this.$store.state.currentAdmin.username = "";
          this.$store.state.currentAdmin.login_time = null;
          this.$store.state.currentAdmin.logout_time = null;

          this.$router.push("/adminlogin");
        }
      } else {
        this.$router.push("/adminlogin");
      }
    },

    handleOK() {
      this.alertshow = false;
    },

    ask_sure() {
      if (this.selected.length > 0) {
        this.show = true;
      }
    },

    merge() {
      if (this.selected.length == 2) {
        let card_data = [];

        firebase
          .firestore()
          .collection("access_list")
          .doc(this.selected[0])
          .get()
          .then((doc) => {
            card_data.push(doc.data());

            firebase
              .firestore()
              .collection("access_list")
              .doc(this.selected[1])
              .get()
              .then((doc2) => {
                card_data.push(doc2.data());

                this.doMerge(card_data);
              });
          });
      } else {
        this.alertshow = true;
        this.message = "Please select only 2 Status Cards to merge!";
      }
    },

    doMerge(card_data) {
      console.log("do merge");
      let newCard = {};
      newCard.name1 = card_data[0].fname + " " + card_data[0].lname;
      newCard.name2 = card_data[1].fname + " " + card_data[1].lname;
      newCard.status1 = card_data[0].status;
      newCard.status2 = card_data[1].status;
      newCard.type1 = card_data[0].type;
      newCard.type2 = card_data[1].type;
      newCard.time = this.get_today_date() + " " + this.get_today_time();
      newCard.merge = true;

      firebase
        .firestore()
        .collection("access_list")
        .doc(this.selected[0])
        .delete()
        .then(() => {
          firebase
            .firestore()
            .collection("access_list")
            .doc(this.selected[1])
            .delete()
            .then(() => {
              firebase
                .firestore()
                .collection("access_list")
                .doc(newCard.name1 + "_" + newCard.name2)
                .set(newCard)
                .then(() => {
                  this.alertshow = true;
                  this.message = "Merge Successfully";
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },

    get_today_date() {
      const d = new Date();
      const year = d.getFullYear();
      const month =
        (d.getMonth() + 1).toString().length == 2
          ? d.getMonth() + 1
          : "0" + (d.getMonth() + 1).toString();
      const date = d.getDate();
      return year.toString() + "-" + month + "-" + date.toString();
    },

    get_today_time() {
      const today = new Date();
      let mins;
      let seconds = today.getSeconds().toString();

      if (today.getMinutes().toString().length < 2) {
        mins = "0" + today.getMinutes().toString();
      } else {
        mins = today.getMinutes().toString();
      }

      if (seconds.length < 2) {
        seconds = "0" + today.getSeconds().toString();
      }

      return today.getHours() + ":" + mins + ":" + seconds;
    },

    handleDelete(res) {
      console.log("merge data ", this.selected);

      if (res) {
        this.selected.forEach((card) => {
          this.deleteItem(card);
        });
      }

      this.show = false;
    },

    filterItems() {
      if (this.filter_type == "All") {
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
      } else {
        this.item_list = [];
        this.loading = true;
        firebase
          .firestore()
          .collection("access_list")
          .where("status", "==", this.filter_type)
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              this.item_list.push(doc.data());
            });

            this.loading = false;
          });
      }
    },

    filterItemsType() {
      if (this.vehicle_type == "All") {
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
      } else {
        this.item_list = [];
        this.loading = true;
        firebase
          .firestore()
          .collection("access_list")
          .where("type", "==", this.vehicle_type)
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              this.item_list.push(doc.data());
            });

            this.loading = false;
          });
      }
    },

    deleteItem(id) {
      this.item_list = [];

      firebase
        .firestore()
        .collection("access_list")
        .doc(id)
        .delete()
        .then(() => {
          console.log("deleted!");
        });
    },
  },
};
</script>