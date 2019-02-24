import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit'

Vue.config.productionTip = false
let app;
firebase.auth().onAuthStateChanged(function(user){
  if(!app) {
    app = new Vue({
      router,
      template: '<App/>',
      components: {App},
      render: h => h(App)
    }).$mount('#app')
  }
})
