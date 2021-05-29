import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebaseConfig from './config/firebase'
import firebase from "firebase";
import "firebase/firestore"

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)

firebase.initializeApp(firebaseConfig);



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
