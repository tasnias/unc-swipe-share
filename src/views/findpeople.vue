<template>
   <v-container>
        <v-layout justify-center>
          <v-flex
            xs12
            md10
            lg8
          >
            <v-toolbar class="grey lighten-3">
                <v-text-field
                    prepend-icon="search"
                    single-line>
                </v-text-field>
                <v-btn icon @click.stop="filtermenu=true">
                    <v-icon>filter_list</v-icon>
                </v-btn>
            </v-toolbar>

            <Person v-for="person in peoplelist" :key="person.value.email" flat v-bind:person="person.value" :filter="person.filter"/>
            
          </v-flex>
        </v-layout>
        <v-bottom-sheet
            v-model="filtermenu"
            lazy
        >
        <v-card tile>
            <v-card-title><h3>Filter by</h3></v-card-title>
            <v-card-text>
                <h4>Swipe Status</h4>
                <v-checkbox label="People who are requesting" v-model="filters.requesting" color="light-blue darken-3" @click="filter(filters.requesting)"></v-checkbox>

                <v-checkbox label="People who are sharing" v-model="filters.sharing" color="light-blue darken-3" @click="filter(filters.sharing)"></v-checkbox>


                <h4>Location</h4>
                <v-checkbox label="Lenoir" v-model="filters.lenoir" color="light-blue darken-3" @click="filter(filters.lenoir)"></v-checkbox>

                <v-checkbox label="Ram's" v-model="filters.rams" color="light-blue darken-3" @click="filter(filters.rams)"></v-checkbox>
            </v-card-text>
        </v-card>
        </v-bottom-sheet>
   </v-container>
</template>

<script>
    import db from '../components/firebaseInit'
    import firebase from 'firebase'
    import Person from '../components/person'
    export default {
        name: 'findpeople',
        components: {
            Person,
        },
        data () {
            return {
                uid: firebase.auth().currentUser.uid,
                peoplelist: [],
                dialog: false,
                datemenu: false,
                timemenu: false,
                filtermenu: false, 
                filters: {
                    requesting: true,
                    sharing: true,
                    lenoir: true, 
                    rams: true,
                }
            }
        },
        
        beforeMount() {
            this.getPeople("show", this.peoplelist);
        },

        methods: {
            filter(category) {
                if (!category) {
                    for (var i = 0; i < this.peoplelist.length; i++) {
                        if (this.peoplelist[i].value.requesting) {
                                    this.peoplelist.splice(i, 1, {filter: true, value: this.peoplelist[i].value});
                        }
                    }
                }
                else if (category) {
                    for (i = 0; i < this.peoplelist.length; i++) {
                        if (this.peoplelist[i].value.requesting) {
                                    this.peoplelist.splice(i, 1, {filter: false, value: this.peoplelist[i].value});
                        }
                    }
                }
            },
            getPeople(type, list) {
                db.collection("users").where(type, "==", true).onSnapshot(querySnapshot => {
                    querySnapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            list.push({filter: false, value: change.doc.data()});
                            list[list.length - 1].value.id = change.doc.id;
                        }
                        if (change.type === 'modified') {
                            for (var i = 0; i < list.length; i++) {
                                if (list[i].email === change.doc.data().email) {
                                    list.splice(i, 1, {filter: false, value: change.doc.data()});
                                    return;
                                }
                            }
                        }

                        if (change.type === 'removed') {
                            for (i = 0; i < list.length; i++) {
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
 