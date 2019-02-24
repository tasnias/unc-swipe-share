<template>
  <div id="swipesettings">

    
    <h4>Share a Swipe</h4>
    
    <p>Would you like to share your swipes?</p>
    <p>Turning this on broadcasts you as available
      to swipe someone in to a dining hall. If someone
      is requesting a swipe, you can choose to fulfill
      their request.</p>
    <div class="switch">
       <label>
         No
         <input type="checkbox" v-model="sharing" @click="updateSharing">
         <span class="lever"></span>
         Yes
       </label>
     </div>
     {{this.sharing}}
     {{this.uid}}
     
  </div>

  
</template>

<script>
  import db from './firebaseInit'
  import firebase from 'firebase'
  export default {
    name: 'swipesettings',
    data () {
      return {
        sharing: false,
        uid: firebase.auth().currentUser.uid
      }
    },
    methods: {
      updateSharing() {
        db.collection('users').doc(firebase.auth().currentUser.uid).set({
          sharing: !this.sharing
        })
      }
    }
  }
</script>
