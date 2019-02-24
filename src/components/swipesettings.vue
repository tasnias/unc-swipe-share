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

    mounted() {
      this.getStatus();
    },

    methods: {
      updateSharing() {
        db.collection('users').doc(firebase.auth().currentUser.uid).update({
          sharing: !this.sharing
        })
      },

      getStatus() {
        db.collections('users').doc(firebase.auth().currentUser.uid).get().then({
          function(doc) {
            this.sharing = doc.data().sharing
          }
        })
      }
    }
  }
</script>
