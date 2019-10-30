<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" v-if="error">
            <v-col cols="12" sm="8" md="4">
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="onSignIn()">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Sign In</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field
                                label="Email"
                                name="email"
                                prepend-icon="mdi-account"
                                type="email"
                                v-model="email"
                                required
                            />

                            <v-text-field
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="password"
                                :rules="passwordRules"
                                required
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn
                                type="submit"
                                :loading="loading"
                                :disabled="loading"
                                color="primary"
                            >Sign in</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            email: "",
            password: "",
            passwordRules: [
                v => !!v || "Password is required",
                v =>
                    (v && v.length >= 6) ||
                    "Password should be at least 6 characters"
            ]
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        error() {
            return this.$store.getters.error;
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    watch: {
        user(value) {
            if (value !== null && value !== undefined) {
                this.$router.push("/");
            }
        }
    },
    methods: {
        onSignIn() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch("signUserIn", {
                    email: this.email,
                    password: this.password
                });
            }
        },
        onDismissed() {
            this.$store.dispatch("clearError");
        }
    }
};
</script>