<template>
    <v-container>
        <v-layout row v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    v-if="loading"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-col cols="4" offset="4">
                <v-card>
                    <v-card class="mx-auto" max-width>
                        <v-card-title>
                            {{ meetup.title }}
                            <template v-if="userIsCreator">
                                <v-spacer></v-spacer>
                                <app-edit-meetup-details-dialog :meetup="meetup" />
                            </template>
                        </v-card-title>
                        <v-img class="white--text align-end" :src="meetup.imageUrl"></v-img>
                        <v-card-subtitle
                            class="pb-0"
                        >{{ meetup.date | date }} - {{ meetup.location }}</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>{{ meetup.description ? meetup.description : '-' }}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <app-meetup-register-dialog :meetupId="meetup.id"></app-meetup-register-dialog>
                        </v-card-actions>
                    </v-card>
                </v-card>
            </v-col>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    props: ["id"],
    computed: {
        meetup() {
            
            return this.$store.getters.loadedMeetup(this.id);
        },
        loading() {
            return this.$store.getters.loading;
        },
        userIsAuthenticated() {
            return !!this.$store.getters.user;
        },
        userIsCreator() {
            if (!this.userIsAuthenticated) {
                return false;
            }
            return this.$store.getters.user.id === this.meetup.creatorId;
        }
    },
};
</script>