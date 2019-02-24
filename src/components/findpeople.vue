<template>
  <div id="findpeople">
        {{this.uid}}
        <ul id="sharinglist">
            <li v-for="person in sharinglist" :key="person.id">
                Email: {{ person.email }}
                <br>
                Sharing? {{ person.sharing}}
            </li>
        </ul>
  </div>  
</template>

<script>
    import db from './firebaseInit'
    import firebase from 'firebase'
    export default {
        name: 'findpeople',
        data () {
            return {
                uid: firebase.auth().currentUser.uid,
                sharinglist: [],
            }
        },
        
        beforeMount() {
            this.getSharing();
        },

        methods: {
            getSharing() {
                db.collection("users").where("sharing", "==", true).onSnapshot(snapshot => {
                    snapshot.forEach(doc => {
                        this.sharinglist.push(
                            doc.data());
                    })
                })
            },

        }
    }
</script>
