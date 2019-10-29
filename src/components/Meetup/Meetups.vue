<template>
    <v-container>
        <v-layout row wrap >
            <v-col cols="6" md="6" sm="12" v-for="meetup in meetups" :key="meetup.id">
                <v-card class="mx-auto" max-width>
                    <v-img
                        class="white--text align-end"
                        height="200px"
                        :src=meetup.imageUrl 
                    ></v-img>
                    <v-card-title>{{ meetup.title }}</v-card-title>
                    <v-card-subtitle class="pb-0">{{ meetup.date }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn :to="'/meetups/'+ meetup.id " color="orange" text>Meetup Details</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed:{
        meetups () {
            return this.$store.getters.loadedMeetups;
         }
    }
};
</script>