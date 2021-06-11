import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase'


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
