<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>

    <NavBar :key="$route.fullPath"/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import NavBar from './components/navbar'

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data () {
    return {
      drawer: false,
    }
  }
}
</script>
