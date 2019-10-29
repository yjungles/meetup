<template>
    <div>
        <v-row>
            <v-col>
                <h2>
                    <v-icon left>mdi-account-group</v-icon>My Fremds  List 
                    <v-btn icon  @click="refresh()"><v-icon>mdi-refresh</v-icon></v-btn>
                </h2>

            </v-col>
            <v-col class="justify-end">
                
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    v-model="form.name"
                    v-on:keyup.13="addFriend"
                    label="Name"
                    outlined
                    :counter="30"
                >
                    <v-icon
                        slot="append"
                        color="grey"
                        v-model="form.name"
                        @click="addFriend"
                    >mdi-plus</v-icon>
                </v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-if="friendList.length >0">
                <v-list-item v-for="(friend, i) in friendList" :key="i">
                    <v-list-item-avatar color="grey">
                        <v-icon color="white">mdi-account</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content v-if="isEditing === friend.id">
                        <v-text-field v-model="friend.name" v-on:keyup.13="editFriend(friend)"></v-text-field>
                    </v-list-item-content>

                    <v-list-item-content v-else>
                        <v-list-item-title v-text="friend.name"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn v-if="isEditing === friend.id" icon @click="editFriend(friend)">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn v-else icon @click="isEditing = friend.id">
                            <v-icon color="grey lighten-1">mdi-pencil-outline</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action>
                        <v-menu>
                            <template v-slot:activator="{ on }">
                                <v-icon color="grey lighten-1" v-on="on">mdi-dots-vertical</v-icon>
                            </template>
                            <v-list>
                                <v-list-item @click="deleteFriend(friend);">
                                    <v-list-item-content>
                                        <v-list-item-title>Delete</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-icon>
                                        <v-icon color="red">mdi-delete-outline</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-list-item-action>
                </v-list-item>
            </v-col>
            <v-col v-else>0 fremds</v-col>
        </v-row>
    </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
    data() {
        return {
            friendList: [
                // { name: "uSERpadrão", id: "5db32bb679f71d000fa3d582" },
                { name: "hey raff", id: "5db32bb779f71d000fa3d583" },
                // { name: "SuSERp1", id: "5db32bb779f71d000fa3d584" }
            ],
            form: {
                name: ""
            },
            isEditing: false
        };
    },
    methods: {
        async addFriend() {
            if (this.form.name !== "") {
                let res = await new Promise((resolve, reject) => {
                    axios
                        .post(
                            "http://rest.learncode.academy/api/vue-5/friends/",
                            this.form
                        )
                        .then(res => {
                            resolve(res.data);
                            this.friendList.push(res.data);
                        })
                        .catch(() => {
                            reject();
                        });
                });
                if (!res) return;
                this.form.name = "";
            }
        },
        async editFriend(data) {
            let res = await new Promise((resolve, reject) => {
                axios
                    .put(
                        "http://rest.learncode.academy/api/vue-5/friends/" +
                            data.id,
                        data
                    )
                    .then(() => {
                        this.friendList.find(
                            friend => friend.id === data.id
                        ).name = data.name;
                        resolve();
                        this.isEditing = false;
                    })
                    .catch(() => {
                        reject();
                    });
            });
            if (!res) return;
        },
        async deleteFriend(data) {

            let res = await new Promise((resolve, reject) => {
                axios
                    .delete(
                        "http://rest.learncode.academy/api/vue-5/friends/" +
                            data.id
                    )
                    .then(() => {
                        for (var i = 0; i < this.friendList.length; i++) {
                            if (this.friendList[i]["id"] === data.id) {
                                this.friendList.splice(i, 1);
                            }
                        }
                        resolve();
                        this.isEditing = false;
                    })
                    .catch(() => {
                        reject();
                    });
            });
            if (!res) return;
        },
        async refresh() {
            let res = new Promise((resolve, reject) => {
                axios
                    .get("http://rest.learncode.academy/api/vue-5/friends/")
                    .then(res => {
                        resolve(res.data);
                        this.friendList = res.data;
                    })
                    .catch(() => {
                        reject();
                    });
            });
            if (!res) return;
        }
    },
    created() {
        this.refresh();
    }

};
</script>