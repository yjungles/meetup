<template>
    <!-- App.vue -->
    <v-app>
        <v-navigation-drawer app dark temporary v-model="sideNav">
            <v-list>
                <v-list-item
                    v-for="item in menuItens"
                    :key="item.title"
                    @click="() => {}"
                    :to="item.link"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="userIsAuthenticated" @click="onLogout">
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dark>
            <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <router-link tag="span" style="cursor: pointer" to="/">Meetups</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn text v-for="item in menuItens" :key="item.title" :to="item.link">
                    <v-icon left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
                <v-btn text v-if="userIsAuthenticated" @click="onLogout">
                    <v-icon left>mdi-logout</v-icon>Logout
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-content>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: "App",
    // components: {},
    data: () => ({
        sideNav: false
    }),
    computed: {
        menuItens() {
            let menuItems = [
                {
                    link: "/signup",
                    icon: "mdi-account-plus  ",
                    title: "Sign up"
                },
                { link: "/signin", icon: "mdi-login", title: "Sign in" }
            ];
            if (this.userIsAuthenticated) {
                menuItems = [
                    {
                        link: "/meetups",
                        icon: "mdi-account-group",
                        title: "View Meetups"
                    },
                    {
                        link: "/meetup/new",
                        icon: "mdi-google-classroom",
                        title: "Organize Meetups"
                    },
                    {
                        link: "/profile",
                        icon: "mdi-account-box",
                        title: "Profile"
                    }
                ];
            }
            return menuItems;
        },
        userIsAuthenticated() {
            return !!this.$store.getters.user;
        }
    },
    methods: {
        onLogout () {
            this.$store.dispatch('logout');
            this.$router.push('/');
        }
    },
    created() {
        this.$store.dispatch("loadMeetups");
    }
    
};
</script>
