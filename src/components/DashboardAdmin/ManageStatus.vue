<template>
  <div>

    <div v-if="loading"><h3>Loading...</h3></div>

    <div>
      <v-card
        class="overflow-hidden"
        min-height="500"
        color="purple lighten-1"
        dark
      >
        <v-toolbar flat color="purple">
          <!-- <v-icon>mdi-account</v-icon> -->
          <v-toolbar-title class="font-weight-light ml-3">
            Manage Status</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <!-- <v-btn color="purple darken-3" fab small @click="isEditing = !isEditing">
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn> -->
        </v-toolbar>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="status_name"
                placeholder="Enter New Status"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="warning" @click="cancel"> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="add_status">
            <v-icon left>mdi-plus</v-icon>
            Add
          </v-btn>
        </v-card-actions>

        <v-divider></v-divider><br />

        <v-card-text>
          <h3>Status List</h3>

          <v-row>
            <v-col cols="12" md="12">
              <v-card class="mx-auto">
                <v-list shaped>
                  <v-list-item-group v-model="model">
                    <template v-for="(item, i) in status_items">
                      <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

                      <v-list-item
                        v-else
                        :key="`item-${i}`"
                        :value="item"
                        active-class="deep-purple--text text--accent-4"
                      >
                        <template v-slot:default="{}">
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="item.name"
                            ></v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-icon @click="handleDelete(item.name)"
                              >mdi-close</v-icon
                            >
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <AlertBox :show="show" :showError="message" @clickOK="handleOK" />
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import AlertBox from "../DialogBox/Alertbox.vue";

export default {
  components: {
    AlertBox,
  },

  created() {
    firebase
      .firestore()
      .collection("status")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.status_items.push(doc.data());
        });
      });

    firebase
      .firestore()
      .collection("status")
      .onSnapshot((snap) => {
        this.status_items = [];

        snap.forEach((item) => {
          this.status_items.push(item.data());
        });
    });


  },

  data() {
    return {
      status_name: null,
      loading: false,
      show: false,
      message: "",
      status_items: [],
      model: ["Carrots"],
    };
  },

  methods: {
    cancel() {
      this.status_name = null;
    },

    handleOK() {
      this.show = false;
    },

    update_status_list() {
      this.status_items = [];

      firebase
        .firestore()
        .collection("status")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.status_items.push(doc.data());
          });
        });
    },

    handleDelete(item) {
      firebase
        .firestore()
        .collection("status")
        .doc(item)
        .delete()
        .then(() => {
          this.show = true;
          this.message = "Status Deleted Successfully";

          this.update_status_list();
        });
    },

    add_status() {
      if (this.status_name != null && this.status_name != "") {
        firebase
          .firestore()
          .collection("status")
          .doc(this.status_name)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.show = true;
              this.message = "Status already exists!";
            } else {
              firebase
                .firestore()
                .collection("status")
                .doc(this.status_name)
                .set({
                  name: this.status_name,
                })
                .then(() => {
                  this.show = true;
                  this.message = "New Status Added!";
                });
            }
          });
      } else {
        this.show = true;
        this.message = "Fields cannot be empty";
      }
    },
  },
};
</script>
