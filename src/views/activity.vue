<template>
   <v-container>
        <v-layout justify-center>
          <v-flex
            xs12
            md10
            lg8
          >
            <h3>Your Recent Activity <v-btn icon @click="clear()"><v-icon>delete</v-icon></v-btn></h3>
            <v-hover>
            <v-card v-for="alert in activity" :key="alert.id" flat slot-scope="{ hover }"
      :class="`elevation-${hover ? 5 : 0}`"
      class="mx-auto">
                <v-card-text>
                    <h4>{{alert.value.message}}</h4>
                    Status: {{alert.value.action}}
                    <br>
                    Contact them at {{alert.value.contact}}
                </v-card-text>

                <v-card-actions>
                    <v-btn flat><v-icon color="red">cancel</v-icon>&nbsp; Cancel</v-btn>
                    <span class="grey--text">{{ Date.now() - alert.value.timestamp}}</span> 
                </v-card-actions>

                <v-divider/>
            </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
   </v-container>
</template>

<script>
    import firebase from 'firebase'
    import db from '../components/firebaseInit'
    export default {
        name: 'activity',
        components: {
            
        },
        data () {
            return {
                uid: firebase.auth().currentUser.uid,
                activity: [],
            }
        },

        beforeMount() {
            this.getActivity(this.activity);
        },

        methods: {
            getActivity(list) {
                db.collection("users").doc(firebase.auth().currentUser.uid).collection("activity")
                .orderBy("timestamp", 'desc')
                .onSnapshot(querySnapshot => {
                    querySnapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            list.push({id: change.doc.id, value: change.doc.data()});
                        }
                    });
                });
            },

            clear() {
                db.collection("users").doc(firebase.auth().currentUser.uid).collection("activity").get().then(snapShot => {
                    snapShot.forEach(doc => {
                        db.collection("users").doc(firebase.auth().currentUser.uid).collection("activity").doc(doc.id).delete();
                    })
                });
                this.activity = [];
            }
        }
    }
</script>
 