<template>
    <v-dialog
        v-model=dialog
        persistent
    >
        <v-card>
            <v-card-title>
                <h3>{{title}} {{person.firstname}}</h3>
            </v-card-title>

            <v-card-text>          
                <v-text-field
                    v-model="date"
                    label="Pick a date"
                    prepend-icon="schedule"
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
        props: ['person', 'title', 'dialog', 'type'],
        name: 'meetingdialog',
        data() {
            return {
                datemenu: false, 
                timemenu: false,
                date: null, 
                time: null,
                uid: firebase.auth().currentUser.uid,
                currentUser: {
                    firstname: "__", 
                    lastname: "_", 
                    phone: "",
                    email: "",
                },
            }
        },

        methods: {
            sendmeeting() {
                if (this.time != null && this.date != null) {
                    db.collection("users").doc(this.uid).collection("activity")
                    .add({
                        location: "idk",
                        time: this.time, 
                        date: this.date,
                        to: this.$props.person.id, 
                        from: this.uid,
                        message: `You would like to ${this.$props.type} ${this.$props.person.firstname} ${this.$props.person.lastname} on ${this.date} at ${this.time}`,
                        contact: this.$props.person.email,
                        timestamp: Date.now(),
                        action: "pending",
                    });


                   db.collection("users").doc(this.uid).get()
                    .then(
                    doc => {
                        this.currentUser.firstname = doc.data().firstname;
                        this.currentUser.lastname = doc.data().lastname;
                    }).then( () => {
                        db.collection("users").doc(this.$props.person.id).collection("activity")
                        .add({
                            to: this.$props.person.id, 
                            from: this.uid,
                            message: `${this.currentUser.firstname} ${this.currentUser.lastname} would like to ${this.$props.type} you on ${this.date} at ${this.time}`,
                            timestamp: Date.now(), 
                            location: "idk",
                            time: this.time, 
                            date: this.date,
                            action: "pending",
                            contact: firebase.auth().currentUser.email,
                        });
                    });
                    alert("Sent message");
                    this.cancel();
                }
                else {
                    alert("Pick a date and time");
                }
            },

            cancel() {
                this.$emit('clicked', false);
            },
        }
    }
</script>
