<template>
    <v-dialog
        v-model=type
        persistent
    >
    <v-card>
        <v-card-title>
        <h3>{{title}} {{person.firstname}}</h3>
        </v-card-title>
        <v-card-text>
             <v-text-field
                v-model="time"
                label="Pick a time"
                prepend-icon="schedule"
                @click.stop="timemenu=true"
            >
            </v-text-field>
        </v-card-text>
        <v-card-actions>
        <v-btn
            color="green"
            flat="flat"
            @click="sendmeeting()"
        >
            Send Time
        </v-btn>

        <v-btn
            color="gray"
            flat="flat"
            @click="cancel()"
        >
            Cancel
        </v-btn>
        </v-card-actions>
        <!--<v-card-title class="headline">{{title}}{{person.firstname}}?</v-card-title>
        <v-card-text>

            <v-text-field
                v-model="date"
                label="Pick a Date"
                prepend-icon="event"
                @click.stop="datemenu=true"
            >
            </v-text-field>
            <v-text-field
                v-model="time"
                label="Pick a time"
                prepend-icon="schedule"
                @click.stop="timemenu=true"
            >
            </v-text-field>
            <v-menu
            v-model="datemenu"
            :close-on-content-click="false"
            lazy
            transition="scale-transition"
            min-width="290px"
            >
                
                <v-date-picker v-model="date" @input="datemenu = false"></v-date-picker>
            </v-menu>
            <v-menu
            v-model="timemenu"
            :close-on-content-click="false"
            lazy
            transition="scale-transition"
            min-width="290px"
            >
                
                <v-time-picker v-model="time"></v-time-picker>
            </v-menu>

        </v-card-text>

        <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            color="green"
            flat="flat"
            @click="dialog = false"
        >
            Send Time
        </v-btn>

        <v-btn
            color="gray"
            flat="flat"
            @click="dialog = false"
        >
            Cancel
        </v-btn>
        </v-card-actions>-->
    </v-card>
    </v-dialog>
</template>

<script>
    import db from '../components/firebaseInit'
    import firebase from 'firebase'
    export default {
        props: ['person', 'title', 'type'],
        name: 'meetingdialog',
        data() {
            return {
                datemenu: false, 
                timemenu: false,
                dialog: true,
                date: null, 
                time: null,
                uid: firebase.auth().currentUser.uid,
            }
        },

        methods: {
            sendmeeting() {
                if (this.time != null) {
                    alert(this.time);
                    db.collection("users").doc(this.uid).collection("activity")
                    .add({
                        location: "idk",
                        time: "time", 
                        date: "date",
                        type: this.$props.type,
                        to: this.$props.person.email, 
                        from: this.uid,
                        message: "You sent a ",
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(), 
                        action: "pending",
                    });

                    db.collection("users").doc(this.$props.person.id).collection("activity")
                    .add({
                        to: this.$props.person.email, 
                        from: this.uid,
                        message: "Sent you a",
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(), 
                        location: "idk",
                        time: "time", 
                        date: "date",
                        type: this.$props.type,
                        action: "pending",
                    })
                    this.cancel();
                }
                else {
                    alert("Pick a date and time");
                }
            },

            cancel() {
                this.$emit('clicked', false);
            }
        }
    }
</script>
