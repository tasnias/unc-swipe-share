<template>
  <div id="swipesettings">

    <h3>Share a Swipe</h3>
      <v-switch v-model="sharing" label="Share" @change="updateDB(sharing, 'sharing')" color="light-blue darken-2"></v-switch>
      <v-switch v-model="requesting" label="Request" color="light-blue darken-2" @change="updateDB(requesting, 'requesting')"></v-switch>

    <h3>I can swipe someone in at...</h3>
      <v-checkbox label="Lenoir Dining Hall" v-model="lenoir" color="light-blue darken-3" @click="updateDB(lenoir, 'lenoir')"></v-checkbox>
      <v-combobox
        v-model="lenoirtimes"
        :items="items"
        label="Your availability for Lenoir"
        chips
        deletable-chips
        flat
        placeholder="ex: MonWedFri 1:25pm-2:00pm, Thur 6:05pm-8:00pm"
        solo
        multiple
        append-icon=""
        v-if="lenoir"
        @change="updateDB(lenoirtimes, 'lenoirtimes')">
      </v-combobox>

      <v-checkbox label="Ram's Dining Hall" v-model="rams" color="light-blue darken-3" @click="updateDB(rams, 'rams')"></v-checkbox>
      <v-combobox
          v-model="ramstimes"
          :items="items"
          label="Your availability for Rams"
          chips
          deletable-chips
          flat
          placeholder="ex: SatSun 1:25pm-2:00pm"
          solo
          multiple
          append-icon=""
          v-if="rams"
          @change="updateDB(ramstimes, 'ramstimes')">
        </v-combobox>

    <h3>Your Contact Info</h3>
    <p>Phone: {{this.phone}}</p>
    <p>Email: {{this.email}} </p>
    
    <h3>How you appear to others:</h3>

    <v-card>
      <v-card-title primary-title>
        <div>
            <h3 class="headline mb-3"> {{this.firstname}} {{this.lastname}} is 
              <span v-if="this.sharing">sharing swipes</span>
              <span v-if="this.sharing && this.requesting">, and </span>
              <span v-if="this.requesting">requesting swipes</span>
            </h3>
            <p>Phone: {{this.phone}}</p>
            <p v-if=this.lenoir>Lenoir Times: {{this.lenoirtimes}}</p>
            <p v-if=this.rams>Ram's Times: {{this.ramstimes}}</p>
            <v-btn dark depressed class="light-blue darken-3">Schedule Meeting Time</v-btn>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
  import db from '../components/firebaseInit'
  import Person from '../components/person'
  import firebase from 'firebase'
  export default {
    name: 'swipesettings',
    components: {
      Person,
    },

    data () {
      return {
        sharing: false,
        requesting: false,
        uid: firebase.auth().currentUser.uid,
        lenoir: false,
        lenoirtimes: [],
        rams: false,
        ramstimes: [],
        loading: false,
        firstname: "",
        lastname: "",
        phone: "", 
        email: "",
      }
    },

    mounted() {
      this.getStatus();
    },
    
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getStatus();
        next();
      })
    },

    beforeRouteUpdate (to, from, next) {
      next(vm => {
        vm.getStatus();
        next();
      })
    },

    methods: {
      updateDB: function(local, fb) {
        let update = {};
        update[fb] = local;
        db.collection('users').doc(firebase.auth().currentUser.uid).update(update);

        //update if card is showing or not; also should not show if lenoirtimes & ramstimes are empty
        if (fb === 'sharing' || fb ==='requesting') {
          let show = this.sharing || this.requesting;
          db.collection('users').doc(firebase.auth().currentUser.uid).update({
            show: show
          });
        }
      },

      getStatus() {
        this.loading = false;
        db.collection('users').doc(this.uid).get()
        .then(
          doc => {
            this.sharing = doc.data().sharing;
            this.requesting = doc.data().requesting;
            this.lenoir = doc.data().lenoir;
            this.rams = doc.data().rams;
            this.lenoirtimes = doc.data().lenoirtimes;
            this.ramstimes = doc.data().ramstimes;
            this.firstname = doc.data().firstname;
            this.lastname = doc.data().lastname;
            this.phone = doc.data().phone;
            this.email = doc.data().email;
          }
        ).catch(err => {
            alert(err);
        })
      }
    }
  }
</script>
