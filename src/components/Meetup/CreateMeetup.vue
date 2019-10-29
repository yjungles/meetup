<template>
    <v-container>
        <v-layout row justify-space-between>
            <v-flex xs12 sm3>
                <v-card class="mx-auto" max-width="300">
                    <v-card class="mx-auto">
                        <div class="grey lighten-2 text-center" style="min-height:180px">
                            <v-img :src="image"></v-img>
                        </div>
                        <v-card-title>{{ title }}</v-card-title>
                        <v-card-subtitle class="pb-0">{{ location }}</v-card-subtitle>

                        <v-card-text class="text--primary">{{ description }}</v-card-text>
                    </v-card>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <h4 class="primary--text">Create a new Meetup</h4>

                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="onCreateMeetup">
                    <v-text-field
                        v-model="title"
                        label="Title"
                        :counter="30"
                        prepend-icon="mdi-pound"
                        :rules="titleRules"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="location"
                        label="Location"
                        prepend-icon="mdi-map-marker-outline"
                        :counter="30"
                        :rules="locationRules"
                        required
                    ></v-text-field>
                    <v-row justify="center">
                        <v-col>
                            <v-dialog
                                ref="dialog"
                                v-model="modal2"
                                :return-value.sync="time"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="time"
                                        label="Picker in dialog"
                                        prepend-icon="mdi-clock-outline"
                                        readonly
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-time-picker v-if="modal2" v-model="time" full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-col>
                        <v-col>
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="date"
                                        label="Date"
                                        prepend-icon="mdi-calendar"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>

                    <v-text-field
                        v-model="image"
                        label="Image Url"
                        prepend-icon="mdi-image-outline"
                        :rules="imageRules"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="description"
                        label="Description"
                        prepend-icon="mdi-comment-outline"
                        :rules="descriptionRules"
                        required
                    ></v-textarea>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            large
                            :disabled="!valid"
                            color="success"
                            class="mr-4"
                            type="submit"
                        >Create</v-btn>
                        <v-btn large color="error" class="mr-4" @click="reset">Reset</v-btn>
                    </v-card-actions>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        valid: true,
        title: "",
        titleRules: [
            v => !!v || "Title is required",
            v =>
                (v && v.length <= 30) || "Title must be less than 30 characters"
        ],
        location: "",
        locationRules: [
            v => !!v || "Location is required",
            v =>
                (v && v.length <= 30) ||
                "Location must be less than 30 characters"
        ],
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,

        dateRules: [v => !!v || "Date is required"],
        time: "",
        timeRules: [v => !!v || "Time is required"],
        menu2: false,
        modal2: false,
        image: "",
        imageRules: [v => !!v || "Image is required"],
        description: "",
        descriptionRules: [v => !!v || "Description is required"]
    }),

    methods: {
        reset() {
            this.$refs.form.reset();
        },
        onCreateMeetup() {
            if (this.$refs.form.validate()) {
                const meetupData = {
                    title: this.title,
                    location: this.location,
                    imageUrl: this.image,
                    description: this.description,
                    date: this.date + " " + this.time,
                };
                this.$store.dispatch("createMeetup", meetupData);
                this.$router.push("/meetups");
            }
        }
    }
};
</script>