<template>
  <div>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      disable-resize-watcher
      v-if="isLoggedIn">

      <v-list>
        <v-list-tile-content>
          <v-list-tile-title>
            <v-layout justify-center>
              <h3>Hi {{this.currentUser}}</h3>           
            </v-layout>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list>

      <v-list>
        <v-list-tile to="/" v-if="isLoggedIn">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Find People</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to='/swipesettings' v-if="isLoggedIn">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Swipe Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to='/activity' v-if="isLoggedIn">
          <v-list-tile-action>
            <v-icon>trending_up</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Activity</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-hover>
    <v-toolbar color="light-blue darken-3" scroll-toolbar-off-screen flat dark app slot-scope="{ hover }"
      :class="`elevation-${hover ? 5 : 0}`"
      class="mx-auto">
      <v-toolbar-side-icon v-on:click="drawer=!drawer" v-if="isLoggedIn"/>
      
      <v-toolbar-title>
        <router-link to="/">-</router-link>UNC Swipe Share
      </v-toolbar-title>
      
      <v-spacer/>

      <v-btn v-if="!isLoggedIn" to='/login' flat>
        Login
      </v-btn>

      <v-btn v-if="!isLoggedIn" to='/register' flat>
        Register
      </v-btn>

      <v-btn v-if="isLoggedIn" flat>
        <button v-on:click="logout">LOGOUT</button>
      </v-btn>
      
    </v-toolbar>
    </v-hover>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'navbar',
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
