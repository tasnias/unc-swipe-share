<template>
   <v-container>
       <h3>Your Recent Activity</h3>
       <ul>
           <li v-for="alert in activity" :key="alert.id">
               {{alert.from }} &nbsp; {{alert.message}}
           </li>
       </ul>
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
                db.collection("users").doc(this.uid).collection("activity")
                .onSnapshot(querySnapshot => {
                    querySnapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            list.push(change.doc.data());
                        }
                    });
                });
            },
        }
    }
</script>
 