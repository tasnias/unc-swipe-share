<template>
    <div>
        
    </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'person',
    data() {
      return {
        drawer: false,
        isLoggedIn: false,
        currentUser: false
      }
    },
    created() {
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true
        this.currentUser = firebase.auth().currentUser.email
      }
    },
    /*eslint-disable*/
    methods: {
      logout: function() {
        this.isLoggedIn = false
        this.currentUser = false
        firebase.auth().signOut().then(() => {
          this.$router.push('/login');
        })
      }
    }
  }
</script>
