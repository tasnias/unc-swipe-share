<template>
  <v-form v-model="valid">
      <v-container>
        <v-layout justify-center align-center>
          <v-flex
            xs12
            md4
          >
            <h2 class="text-xs-center">Register</h2>
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
              v-on:click="register" 
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
    name: 'register',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      register: function (e) {

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert(`Account created for ${user.user.email}`)
          db.collection('users').doc(user.user.uid).set({
            email: user.user.email, 
            sharing: true, 
            requesting: true, 
            lenoir: true,
            rams: true, 
            show: true, 
            firstname: "First", 
            lastname: "Last",
            lenoirtimes: [], 
            ramstimes: [],
          })
          this.$router.push('/swipesettings')
        },
        err => {
          alert(err.message)
        })
        e.preventDefault()
      },

      bool: validate() {

      }
    }
  }
</script>
