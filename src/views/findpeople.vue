<template>
  <div id="findpeople">
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
            <h3 class="headline mb-3"> {{ person.firstname }} {{person.lastname}}</h3>
            Sharing? {{ person.sharing}} 
            Requesting {{person.requesting}}
            <p>Phone: {{person.phone}}</p>
            <p>Times: {{person.lenoirtimes}}</p>
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
        name: 'findpeople',
        data () {
            return {
                uid: firebase.auth().currentUser.uid,
                sharinglist: [],
                requestinglist:[],
                peoplelist: [],
            }
        },
        
        beforeMount() {
            /*this.getPeople("sharing", this.sharinglist);
            this.getPeople("requesting", this.requestinglist);*/
            this.getPeople("sharing", this.sharinglist);
            this.getPeople("requesting", this.requestinglist);
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
 