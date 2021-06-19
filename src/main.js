import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase'


// const firebaseConfig = {
//   apiKey: "AIzaSyDoCugVUdNxVQFAfG2V7Lbr1Wly_BSizEY",
//   authDomain: "carpark-9b808.firebaseapp.com",
//   projectId: "carpark-9b808",
//   storageBucket: "carpark-9b808.appspot.com",
//   messagingSenderId: "907199048616",
//   appId: "1:907199048616:web:ae09988c347b561e38cb9d",
//   measurementId: "G-JDD0FPC4WV"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCymO1f8p8Vj29nXeNPgmu5Iw_QBa8HTe0",
  authDomain: "bookaride-dbff6.firebaseapp.com",
  projectId: "bookaride-dbff6",
  storageBucket: "bookaride-dbff6.appspot.com",
  messagingSenderId: "497615065978",
  appId: "1:497615065978:web:3fc27d164ec4a9ca81bcc3",
  measurementId: "G-T891S2PBHV"
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
