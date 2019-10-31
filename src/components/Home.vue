<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large to="/meetups" class="primary mr-2">Explore Meetups</v-btn>
                <v-btn large to="/meetup/new" class="primary mr-2">Create New Meetup</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular :size="70" :width="7" v-if="loading" color="primary" indeterminate></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2" v-if="!loading">
            <v-flex xs6>
                <v-carousel style="cursor: pointer;">
                    <v-carousel-item
                        v-for="meetup in meetups"
                        :key="meetup.id"
                        :src="meetup.imageUrl"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                        @click="onLoadMeetup(meetup.id)"
                    >
                        <div class="title">{{ meetup.title }}</div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12 class="text-xs-center">
                <p>Join our Awesome meetups!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    computed: {
        meetups() {
            return this.$store.getters.featuredMeetups;
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        onLoadMeetup(id) {
            this.$router.push("/meetups/" + id);
        }
    },
    created() {
            this.$store.dispatch('loadMeetups');
    }
};
</script>

<style scoped>
.title {
    /* position: absolute; */
    text-align: center;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    font-size: 2em;
    padding: 20px;
    margin: 0 auto;
}
</style>