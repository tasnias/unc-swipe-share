<template>
    
    <v-form v-model="valid">
      <v-container>
        <v-layout justify-center align-center>
          <v-flex
            xs12
            md4
          >
            <h2 class="text-xs-center">Login</h2>
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              :type="'password'"
              required
            ></v-text-field>
              <v-btn
                type="submit"
                v-on:click="login" 
                dark
                large
                depressed
                color="light-blue darken-3 white--text"
              >
                Submit
              </v-btn>            
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
</template>

<script>
  import firebase from 'firebase'
  import db from '../../components/firebaseInit'
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login: function (e) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          db.collection('users').doc(user.user.uid).update({
            email: user.user.email
          })
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        })
        e.preventDefault()
      }
    }
  }
</script>
