<template>
  <div id="swipesettings">
    <h3>Share a Swipe</h3>
      <v-switch v-model="sharing" label="Share" @change="updateSharing" color="light-blue darken-2"></v-switch>
      <v-switch v-model="requesting" label="Request" color="light-blue darken-2" @change="updateRequesting"></v-switch>

    <h3>I can swipe someone it at...</h3>
      <v-checkbox label="Lenoir Dining Hall" v-model="lenoir" color="light-blue darken-3"></v-checkbox>
      <v-combobox
        v-model="lenoirtimes"
        :items="items"
        label="Your availability for Lenoir"
        chips
        deletable-chips
        placeholder="ex: MonWedFri 1:25pm-2:00pm, Thur 6:05pm-8:00pm"
        solo
        multiple
        append-icon=""
        v-if="lenoir"
        @change="updateLenoirTimes">
      </v-combobox>

      <v-checkbox label="Ram's Dining Hall" v-model="rams" color="light-blue darken-3"></v-checkbox>
      <v-combobox
          v-model="ramstimes"
          :items="items"
          label="Your availability for Rams"
          chips
          deletable-chips
          placeholder="SatSun 1:25pm-2:00pm"
          solo
          multiple
          append-icon=""
          v-if="rams"
          @change="updateRamsTimes">
        </v-combobox>

    <h3>Your Contact Info</h3>
    <p>Phone:</p>
    <p>Email: </p>
    
    <h3>How you appear to others:</h3>
    <v-card>
      <v-card-title primary-title>
        <div>
            <h3 class="headline mb-3"> Firstname Lastname</h3>
            Sharing? 
            <p>Phone: </p>
            <p>Times: </p>
            <v-btn class="light-blue lighten-4">Schedule Meeting Time</v-btn>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
  import db from '../components/firebaseInit'
  import firebase from 'firebase'
  export default {
    name: 'swipesettings',
    data () {
      return {
        sharing: false,
        requesting: false,
        uid: firebase.auth().currentUser.uid,
        lenoir: false,
        lenoirtimes: ["Tue 11:00am-11:30am"],
        rams: false,
        ramstimes: [],
      }
    },

    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getStatus();
        next();
      })
    },

    methods: {
      updateSharing() {
        db.collection('users').doc(firebase.auth().currentUser.uid).update({
          sharing: this.sharing
        });
      },

      updateRamsTimes() {
          alert("ramstimes");
          db.collection('users').doc(firebase.auth().currentUser.uid).update({
          ramstimes: this.ramstimes
        });
      },

      updateLenoirTimes() {
        db.collection('users').doc(firebase.auth().currentUser.uid).update({
          lenoirtimes: this.lenoirtimes
        });
      },

      updateRequesting() {
        db.collection('users').doc(firebase.auth().currentUser.uid).update({
          requesting: this.requesting
        });
      },

      getStatus() {
        /*alert("here")*/
        db.collections('users').doc(firebase.auth().currentUser.uid).get().then({
          function(doc) {
            this.sharing = doc.data().sharing
          }
        })
      }
    }
  }
</script>
