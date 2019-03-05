<template>
  <div id="findpeople">
      <v-toolbar
    >
      <v-text-field
        prepend-icon="search"
        single-line
      ></v-text-field>

      <v-btn icon>
        <v-icon>sort</v-icon>
      </v-btn>

    </v-toolbar>

            <v-card v-for="person in sharinglist" :key="person.email">
                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-3"> {{ person.firstname }} {{person.lastname}}</h3>
                    <div>Sharing? {{ person.sharing}} 
                        <p>Phone: {{person.phone}}</p>
                        <p>Times: {{person.lenoirtimes}}</p>
                        <v-btn class="blue-grey lighten-3">Schedule Meeting Time</v-btn>
                    </div>
                </div>
                </v-card-title>
            </v-card>

            <v-card v-for="person in requestinglist" :key="person.email">
                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-3"> {{ person.firstname }} {{person.lastname}}</h3>
                    <div>Requesting? {{ person.requesting}} 
                        {{person.email}}
                        <p>Phone: {{person.phone}}</p>
                        <v-btn>Schedule Meeting Time</v-btn>
                    </div>
                </div>
                </v-card-title>
            </v-card>
  </div>  
</template>

<script>
    import db from '../components/firebaseInit'
    import firebase from 'firebase'
    export default {
        name: 'findpeople',
        data () {
            return {
                uid: firebase.auth().currentUser.uid,
                sharinglist: [],
                requestinglist:[],
            }
        },
        
        beforeMount() {
            this.getPeople("sharing", this.sharinglist);
            this.getPeople("requesting", this.requestinglist);
        },

        methods: {
            getPeople(type, list) {
                db.collection("users").where(type, "==", true).onSnapshot(snapshot => {
                    snapshot.forEach(doc => {
                        list.push(
                            doc.data());
                    })
                });
            },

        }
    }
</script>
