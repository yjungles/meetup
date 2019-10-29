import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DateFilter from "./filters/date";
import *  as firebase from 'firebase';


Vue.config.productionTip = false;
Vue.filter('date', DateFilter);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // Initialize Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyCOoBLTG_0xBJsa4_1rsd9GC_svwe8LN1s",
      authDomain: "teste-2e96a.firebaseapp.com",
      databaseURL: "https://teste-2e96a.firebaseio.com",
      projectId: "teste-2e96a",
      storageBucket: "teste-2e96a.appspot.com",
      messagingSenderId: "972714659367",
      appId: "1:972714659367:web:b09a8f24b04038888d8802",
      measurementId: "G-MGV1EKNLN5"
    };
    firebase.initializeApp(firebaseConfig);
  },


}).$mount("#app");
