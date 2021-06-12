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
          <v-toolbar-title class="font-weight-light ml-3">
            Manage Users</v-toolbar-title
          >
          <v-spacer></v-spacer>
          
        </v-toolbar>

        <v-card-text>

            <center> <h2> Add new user </h2></center>

          <v-row>


            <v-col cols="12" md="6">
              <v-text-field
                label="First Name"
                v-model="fname"
                placeholder="First Name"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Last Name"
                v-model="lname"
                placeholder="Last Name"
              />
            </v-col>

          </v-row>

          <v-row>


            <v-col cols="12" md="12">
              <v-text-field
                label="Username"
                v-model="username"
                placeholder="Username"
              />
            </v-col>

          </v-row>

          <v-row>


            <v-col cols="12" md="6">
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Retype Password"
                type="password"
                v-model="retype_password"
                placeholder="Retype Password"
              />
            </v-col>

          </v-row>


        </v-card-text>

        <v-card-actions>
          <v-btn color="warning" @click="this.resetForm"> Clear </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="add_user">
            <v-icon left>mdi-plus</v-icon>
            Add New User
          </v-btn>
        </v-card-actions>

        <v-divider></v-divider><br />

         <v-card-text>

            <center> <h2> Reset Password </h2></center><br/>

            <v-row >

                <v-col cols="12" md="6">

                    <v-select
                        v-model="selected_user"
                        :items="user_list"
                        item-text="name"
                        item-value="name"
                        label="Select User"
                        outlined
                    ></v-select>

                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field
                        label="New Password"
                        type='password'
                        v-model="new_password"
                        placeholder="Retype Password"
                    />
                </v-col>

            </v-row>
         </v-card-text>

        <v-card-actions>

          <v-btn color="warning" @click="this.reset_new_pass" > Clear </v-btn>

          <v-spacer></v-spacer>

          <v-btn color="success" @click="reset_password">
            Reset Password
          </v-btn>

        </v-card-actions><Br/>

        <v-divider></v-divider><br />

        <v-card-text>
          <h3>User List</h3>
          <v-row>
            <v-col cols="12" md="12">
              <v-card class="mx-auto">
                <v-list shaped>
                  <v-list-item-group v-model="model">
                    <template v-for="(item, i) in user_list">
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

    components : {
        AlertBox
    },

    created(){

        firebase.firestore().collection('users').get()
        .then(snap => {
            snap.forEach(user => {
                this.user_list.push({name : user.data().username})
            })
        })

    },
  
    data(){
        return {
            show : false,
            loading : false,
            message : '',
            model : null,

            user_list : [],
            selected_user : '',

            fname : '',
            lname : '',
            username : '',
            password : '',
            retype_password :'',
            new_password : '',
        }
    },

    methods : {

        update_userdata(){

            this.user_list = [];

            firebase.firestore().collection('users').get()
            .then(snap => {
                snap.forEach(user => {
                    this.user_list.push({name : user.data().username})
                })
            })
        },

        handleDelete(name){
          firebase.firestore().collection('users').doc(name).delete()
          .then(() => {
            this.show = true;
            this.message = 'Employee Deleted Successfully!';
            this.update_userdata();
          })
          .catch(err => console.log(err));
        },

        resetForm(){
            this.fname = '';
            this.lname = '';
            this.username = '';
            this.password = '';
            this.retype_password = '';
        },

        reset_new_pass(){
            this.new_password = '';
            this.selected_user = '';
        },

        handleOK(){
            this.show = false;
        },

        reset_password(){
            
            if(this.new_password != '' && this.selected_user != '' ){

                firebase.firestore().collection('users').doc(this.selected_user).update({
                    password : this.new_password 
                })
                .then(() => {
                    this.show = true;
                    this.message = 'Password reseted!';
                })

            }else{
                this.show = true;
                this.message = 'Fields cannot be empty!';
            }
            
        },

        add_user(){

            if(this.fname != '' && this.lname != '' && this.userrname != '' && this.password != '' && this.retype_password != '' ){
                
                if(this.password == this.retype_password){

                    firebase.firestore().collection('users').doc(this.username).get()
                    .then(userDoc => {
                        if(userDoc.exists){
                            this.show = true;
                            this.message = 'Username already exists!';
                        }else{
                            
                            firebase.firestore().collection('users').doc(this.username).set({
                                fname : this.fname,
                                lname : this.lname,
                                username : this.username,
                                password : this.password
                            })
                            .then(() => {
                                this.show = true;
                                this.message = 'New user created!';

                                this.update_userdata();

                                this.resetForm();
                            })
                            .catch(err => {
                                this.show = true;
                                this.message = err;
                            })

                        }
                    })

                }else{
                    this.show = true;
                    this.message = 'Passwords does not match!';
                }

                

            }else{
                this.show = true;
                this.message = 'Please fill out all fields';
            }


        }
    }


};
</script>
