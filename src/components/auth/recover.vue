<template>
  <div class="container">
    <div class = "row">
      <div class="login lighten-4 center">
        <h3>Login</h3>
        <form>
          <div class = "input-field">
            <i class="material-icons prefix">email</i>
            <input type="text" id="email" v-model="email">
            <label for="email">Email</label>
          </div>

          <div class = "input-field">
            <i class="material-icons prefix">lock</i>
            <input type="password" id="password" v-model="password">
            <label for="password">Password</label>
          </div>
          <button v-on:click="login" class="btn btn-large light-blue white-text">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from'firebase'
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
