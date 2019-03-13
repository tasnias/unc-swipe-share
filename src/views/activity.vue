<template>
   <v-container>
       <h3>Your Recent Activity</h3>
           <v-card v-for="alert in activity" :key="alert.id">
               {{alert.value.message}}
               {{alert.value.to}}
                   {{alert.value.timestamp}}
           </v-card>

        <v-btn @click="clear()">Clear</v-btn>
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
 