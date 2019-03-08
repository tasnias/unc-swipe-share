<template>
   <v-container>
        <v-layout justify-center>
          <v-flex
            xs12
            md10
            lg8
          >
            <v-toolbar flat class="grey lighten-2">
                <v-text-field
                    prepend-icon="search"
                    single-line>
                </v-text-field>
                <v-btn icon>
                    <v-icon>filter_list</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card v-for="person in peoplelist" :key="person.email" flat>
                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-3"> {{person.firstname}} {{person.lastname}} is 
                        <span v-if="person.sharing">sharing swipes</span>
                        <span v-if="person.sharing && person.requesting">, and </span>
                        <span v-if="person.requesting">requesting swipes</span>
                    </h3>
                    <p>Phone: {{person.phone}}</p>
                    <p v-if="person.lenoir">Lenoir Times: {{person.lenoirtimes}}</p>
                    <p v-if=person.rams>Ram's Times: {{person.ramstimes}}</p>
                    <v-btn class="light-blue darken-3" dark depressed>Schedule Meeting Time</v-btn>
                </div>
                </v-card-title>
                <v-divider/>
            </v-card>
          </v-flex>
        </v-layout>
   </v-container>
</template>

<script>
    import db from '../components/firebaseInit'
    import firebase from 'firebase'
    export default {
        name: 'findpeople',
        data () {
            return {
                uid: firebase.auth().currentUser.uid,
                peoplelist: [],
            }
        },
        
        beforeMount() {
            this.getPeople("show", this.peoplelist);
        },

        methods: {
            getPeople(type, list) {
                db.collection("users").where(type, "==", true).onSnapshot(querySnapshot => {
                    querySnapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            list.push(change.doc.data());
                        }
                        if (change.type === 'modified') {
                            for (var i = 0; i < list.length; i++) {
                                if (list[i].email === change.doc.data().email) {
                                    list.splice(i, 1, change.doc.data());
                                    return;
                                }
                            }
                        }

                        if (change.type === 'removed') {
                            for (var i = 0; i < list.length; i++) {
                                if (list[i].email === change.doc.data().email) {
                                    list.splice(i, 1);
                                    return;
                                }
                            }
                        }
                    });
                });
            },
        }
    }
</script>
 