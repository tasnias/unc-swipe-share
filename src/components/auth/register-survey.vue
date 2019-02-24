<template>
  <div id="register-survey">
    <h4>Welcome to UNC Swipe Share!</h4>
    <form>
      <p>
      <label>
        <input name="place" type="radio" class="with-gap"/>
        <span class="black-text">Lenoir Dining Hall</span>
      </label>
    </p>
    <p>
      <label>
        <input name="place" type="radio" class="with-gap"/>
        <span class="black-text">Chase Dining Hall</span>
      </label>
    </p>
      <button type="submit" class="btn waves-effect waves-light blue">Submit</button>
      <router-link to="/share" class="btn grey waves-effect waves-light">Cancel</router-link>
    </form>


  </div>
</template>

<script>
  export default {
    name: 'register-survey',
    data () {
      return {
        place: null,
        availabletimes: null,
        sharing: true 
      }
    }
  }
</script>
