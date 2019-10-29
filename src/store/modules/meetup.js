// import axios from "@/plugins/axios";

const state = {
    loadedMeetups: [
        {
            id: "1",
            title: "New York",
            location: "New York",
            description: "New York",
            date: new Date(),
            imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdTzA8tLeCdPSr1c0D1PPDVqC4P2yGaQIOnispEX3foHHOpobJ",
        },
        {
            id: "2",
            title: "Paris",
            location: "New York",
            description: "New York",
            date: new Date(),
            imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTYS76PsvA8N2UrohQhJenGiiVc7E-twhWftukGfPTsgE96kipQ",
        }
    ],
    user: {
        id: 'das821',
        registeredMeetups: ['hsauihdaiw']
    },
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
};

const actions = {

    createMeetup({ commit }, payload) {
        console.log('aewacty');
        const meetup = {
            title: payload.title,
            location: payload.location,
            imageUrl: payload.imageUrl,
            description: payload.description,
            date: payload.date,
        }
        //reach out to firebase and store it
        commit('createMeetup', meetup);
    }

};

const mutations = {

    createMeetup(state, payload) {
        console.log('aewmtt');
        state.loadedMeetups.push(payload);
    }
};

export default {

    state,
    getters,
    actions,
    mutations
};
