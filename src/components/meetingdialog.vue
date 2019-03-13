<template>
    <v-card>
        <v-card-title>
        {{title}} {{person.firstname}}
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
            @click="dialog = false"
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
</template>

<script>
  export default {
    props: ['person', 'title'],
    name: 'meetingdialog',
    data() {
      return {
        datemenu: false, 
        timemenu: false,
        dialog: true,
        date: null, 
        time: null,
      }
    },

    methods: {
        sendmeeting() {
            if (this.time != null) {
                alert(this.time);

            }
            else {
                alert("Pick a date and time");
            }
        }
    }
  }
</script>
