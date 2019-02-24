<template>
  <!--<div id="login" class="container">
    <div class = "row">
      <div class="login lighten-4 center">
        <h3>Login</h3>
        <form>
          <div class = "input-field">
            <i class="material-icons prefix">email</i>
            <label for="email">Email</label>
            <input type="text" id="email" v-model="email">
          </div>

          <div class = "input-field">
            <i class="material-icons prefix">lock</i>
            <input type="password" id="password" v-model="password">
            <label for="password">Password</label>
          </div>
          <button v-on:click="login" class="btn btn-large light-blue darken-4 white-text waves-effect waves-light">Login</button>
        </form>
      </div>
    </div>
  </div>-->
  
    <v-form v-model="valid">
      <v-container>
        <v-layout justify-center align-center>
          <v-flex
            xs12
            md4
          >
            <h2>Login</h2>
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
              color="light-blue"
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
  import db from '../firebaseInit'
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
          db.collection('users').doc(user.user.uid).set({
            email: user.user.email
          })
          this.$router.push('/swipesettings')
        },
        err => {
          alert(err.message)
        })
        e.preventDefault()
      }
    }
  }
</script>
