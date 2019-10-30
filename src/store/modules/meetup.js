// import axios from "@/plugins/axios";
import * as firebase from "firebase";

const state = {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null,
};


const actions = {
    loadMeetups({ commit }) {
        commit('setLoading', true);
        firebase.database().ref('meetups').once('value')
            .then((data) => {
                const meetups = [];
                const obj = data.val();

                for (let key in obj) {
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        description: obj[key].description,
                        imageUrl: obj[key].imageUrl,
                        date: obj[key].date,
                        location: obj[key].location,
                        creatorId: obj[key].creatorId,
                    })
                }
                commit('setLoadedMeetups', meetups);
                commit('setLoading', false);
            })
            .catch((error) => {
                commit('setLoading', false);
                console.log(error);
            })
    },
    createMeetup({ commit, getters }, payload) {
        const meetup = {
            title: payload.title,
            location: payload.location,
            // imageUrl: payload.imageUrl,
            description: payload.description,
            date: payload.date,
            creatorId: getters.user.id
        }
        let imageURL;
        let key;
        let ext;
        firebase.database().ref('meetups').push(meetup)
            .then((data) => {
                key = data.key;
                return key;
            })
            .then(key => {
                const filename = payload.image.name;
                ext = filename.slice(filename.lastIndexOf('.'));
                return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image);
            })
            .then(() => {
                return firebase.storage().ref('meetups/' + key + '.' + ext).getDownloadURL()
            })
            .then(URL => {
                imageURL = URL
                return firebase.database().ref('meetups').child(key).update({ imageUrl: imageURL })
              })
            .then(() => {
                commit('createMeetup', {
                    ...meetup,
                    id: key,
                    imageUrl: imageURL,
                })
            })
            .catch((error) => {
                console.log(error);
                commit('setLoading', false);
            })

    },
    signUserUp({ commit }, payload) {
        commit('setLoading', true);
        commit('clearError');
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                response => {
                    commit('setLoading', false);
                    const newUser = {
                        id: response.user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser);
                }
            ).catch(
                error => {
                    commit('setLoading', false);
                    commit('setError', error);
                }
            )
    },
    signUserIn({ commit }, payload) {
        commit('setLoading', true);
        commit('clearError');
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                response => {
                    commit('setLoading', false);
                    const newUser = {
                        id: response.user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser);
                }
            ).catch(
                error => {
                    commit('setLoading', false);
                    commit('setError', error);
                }
            )
    },
    autoSignIn({ commit }, payload) {
        commit('setUser', { id: payload.uid, registeredMeetups: [] });
    },
    clearError({ commit }) {
        commit('clearError');
    },
    logout({ commit }) {
        firebase.auth().signOut();
        commit('setUser', null);
    }
};

const mutations = {
    setLoadedMeetups(state, payload) {
        state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
        state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
        state.user = payload;
    },
    setLoading(state, payload) {
        state.loading = payload;
    },
    setError(state, payload) {
        state.error = payload;
    },
    clearError(state) {
        state.error = null;
    }

};

const getters = {
    loadedMeetups(state) {
        return state.loadedMeetups.sort((meetupA, meetupB) => {
            return meetupA.date > meetupB.date
        })
    },
    featuredMeetups(state, getters) {
        return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup(state) {
        return (meetupId) => {
            return state.loadedMeetups.find((meetup) => {
                return meetup.id === meetupId
            })
        }
    },
    user(state) {
        return state.user;
    },
    loading(state) {
        return state.loading;
    },
    error(state) {
        return state.error;
    }
};
export default {

    state,
    getters,
    actions,
    mutations
};
