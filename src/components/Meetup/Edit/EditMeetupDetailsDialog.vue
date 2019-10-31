<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn fab icon v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Edit Meetup</v-card-title>

                <v-card-text>
                    <v-text-field
                        v-model="editedTitle"
                        label="Title"
                        :counter="30"
                        prepend-icon="mdi-pound"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="editedDescription"
                        label="Description"
                        prepend-icon="mdi-comment-outline"
                        required
                    ></v-textarea>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text @click="dialog = false">Close</v-btn>
                    <v-btn color="primary" text @click="onSaveChanges">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props: ["meetup"],
    data() {
        return {
            dialog: false,

            editedTitle: this.meetup.title,
            editedDescription: this.meetup.description
        };
    },
    methods: {
        onSaveChanges() {
            if (
                this.editedTitle.trim() === "" ||
                this.editedDescription.trim() === ""
            ) {
                alert('Empty fields!');
            } else {
                this.dialog = false;
                this.$store.dispatch("updateMeetupData", {
                    id: this.meetup.id,
                    title: this.editedTitle,
                    description: this.editedDescription
                });
            }
        }
    }
};
</script>
