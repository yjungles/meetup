<template>
    <div class="text-center">
        <v-dialog persistent v-model="registerDialog">
            <template v-slot:activator="{ on }">
                <v-btn
                    text
                    color="orange"
                    v-on="on"
                >{{ userIsRegistered ? 'Unregister' : 'Register' }}</v-btn>
            </template>

            <v-card>
                <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
                <v-card-title v-else>Register for Meetup?</v-card-title>

                <v-card-text>You can always change your decision later on.</v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red  darken-1" text @click="registerDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" text @click="onAgree">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props: ["meetupId"],
    data: () => ({
        registerDialog:false
    }),
    computed: {
        userIsRegistered() {
            return (
                this.$store.getters.user.registeredMeetups.findIndex(
                    meetupId => {
                        return meetupId === this.meetupId;
                    }
                ) >= 0
            );
        }
    },
    methods: {
        onAgree() {
            this.registerDialog = false;
            console.log("agree");
        }
    }
};
</script>
