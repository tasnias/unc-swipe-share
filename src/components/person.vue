<template>
    <!--<v-card flat>
        <v-card-title primary-title>
        <div>
            <h3 class="headline mb-3"> {{person.firstname}} {{person.lastname}} is 
                <span v-if="person.sharing">sharing swipes</span>
                <span v-if="person.sharing && person.requesting">, and </span>
                <span v-if="person.requesting">requesting swipes</span>
            </h3>
            <p>Email: {{person.email}}</p>
            <p v-if="person.lenoir">Lenoir Availability: {{person.lenoirtimes}}</p>
            <p v-if=person.rams>Ram's Availability: {{person.ramstimes}}</p>
            <v-btn  v-if="person.sharing" class="light-blue darken-3" dark depressed  @click.stop="dialog = true">Request Swipe</v-btn>


            <v-dialog
                v-model="dialog"
                max-width="400"
                fullscreen
                >
                <v-card>
                    <v-card-title class="headline">Request a swipe from {{person.firstname}}?</v-card-title>
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
                    </v-card-actions>
                </v-card>
                </v-dialog>

        </div>
        </v-card-title>
        <v-divider/>
    </v-card>-->
    <div v-if="!filter">
          <br>
    <v-hover>
    <v-card slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      >
      <v-card-title>
        <h3 class="headline"> <span v-if="currentUser">(You)</span> {{person.firstname}} {{person.lastname}} is 
                <span v-if="person.sharing">sharing swipes</span>
                <span v-if="person.sharing && person.requesting">, and </span>
                <span v-if="person.requesting">requesting swipes</span>
        </h3>
      </v-card-title>
      <v-card-text>
        <p>Email: {{person.email}}</p>
        <p v-if="person.lenoir">Lenoir Availability: {{person.lenoirtimes}}</p>
            <p v-if=person.rams>Ram's Availability: {{person.ramstimes}}</p>
            <v-btn  v-if="person.sharing" class="light-blue darken-3" dark depressed  @click.stop="startShareDialog()">
                Request Swipe
            </v-btn> 
            <v-btn v-if="person.requesting" class="light-blue darken-3" dark depressed  @click.stop="startRequestDialog()">Share Swipe 
            </v-btn>
            <MeetingDialog title="Share a swipe with"
                :person="person"
                v-bind:dialog="sharedialog"
                v-bind:type="type"
                @clicked="onClickChild"
            />
        
            <MeetingDialog title="Request a swipe from"
                v-bind:dialog="requestdialog"
                v-bind:type="type"
                :person="person"
                @clicked="onClickChild"
            />
        </v-card-text>
    </v-card>
    </v-hover>
    </div>
</template>

<script>
  import MeetingDialog from './meetingdialog'
  import firebase from 'firebase'
  export default {
    props: ['person', 'filter'],
    name: 'person',
    components: {
            MeetingDialog,
    },
    data() {
      return {
        datemenu: false, 
        timemenu: false,
        sharedialog: false,
        requestdialog: false,
        currentUser: false,
        color: "white",
        type: "",
      }
    },
    created() {
      if (firebase.auth().currentUser.email === this.$props.person.email) {
        this.currentUser = true;
      }
    },
    methods: {
        onClickChild() {
            this.sharedialog = false;
            this.requestdialog = false;
        }, 

        startShareDialog() {
            this.type = "request a swipe from";
            this.requestdialog = true;
        },

        startRequestDialog() {
            this.type = "share a swipe with";
            this.sharedialog = true;
        }
    }
  }
</script>
