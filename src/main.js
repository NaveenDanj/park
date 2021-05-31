import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase'


let firebaseConfig = {
  apiKey: "AIzaSyDoCugVUdNxVQFAfG2V7Lbr1Wly_BSizEY",
  authDomain: "carpark-9b808.firebaseapp.com",
  projectId: "carpark-9b808",
  storageBucket: "carpark-9b808.appspot.com",
  messagingSenderId: "907199048616",
  appId: "1:907199048616:web:ae09988c347b561e38cb9d",
  measurementId: "G-JDD0FPC4WV"
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
