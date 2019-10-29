<template>
    <v-container>
        <v-layout row wrap>
            <v-col cols="6" offset="3">
                <v-card>
                    <v-card class="mx-auto" max-width>
                        <v-img class="white--text align-end" :src="meetup.imageUrl"></v-img>
                        <v-card-title>{{ meetup.title }}</v-card-title>
                        <v-card-subtitle class="pb-0">{{ meetup.date | date }} - {{ meetup.location }}</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>{{ meetup.description ? meetup.description : '-' }}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text color="red">Register</v-btn>
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
        }
    }
};
</script>