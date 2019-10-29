import axios from "@/plugins/axios";

const state = {
  friends: []
};

const getters = {
  friends: state => state.friends
};

const actions = {
  async addFriend({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post(
        'http://rest.learncode.academy/api/vue-5/friends/',
        data
      ).then((res) => {
        commit('addFriend', res.data)
        resolve(res.data)
      }).catch(() => {
        reject()
      });
    })
  },
  async editFriend({ commit }, data) {

    console.log('---store');
    console.log(data);

    return new Promise((resolve, reject) => {
      axios.put(
        'http://rest.learncode.academy/api/vue-5/friends/' + data.id, data
      ).then(() => {
        commit()
        resolve()
      }).catch(() => {
        reject()
      });
    })
  },

  async getFriends({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(
        'http://rest.learncode.academy/api/vue-5/friends/'
      ).then((res) => {
        // commit('setFriends', res.data)
        commit('setFriends', [{ "name": "user1", "id": "5db738f779f71d000fa4043f" }, { "name": "user2", "id": "5db738f979f71d000fa40440" }, { "name": "user3", "id": "5db738fb79f71d000fa40441" }, { "name": "user4", "id": "5db738fd79f71d000fa40442" }])
        resolve(res.data)
      }).catch(() => {
        reject()
      });
    })
  },

};

const mutations = {
  addFriend(state, data) {
    state.friends.push(data)
  },
  setFriends(state, data) {
    console.log('--setfriends');
    state.friends = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
