import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_TAG = 'SET_TAG'
const SET_SYSTEM = 'SET_SYSTEM'
const state = () => ({

    list: '',
    tagActive: -1,
    system: {}

})
const getters = {
    get_tag: (state) => {
        return state.tagActive
    },
    get_system: (state) => {
        return state.system
    }
}
const mutations = {
    add(state, text) {

        state.list = text;
    },
    SET_TAG(state, number) {
        state.tagActive = number;
    },
    SET_SYSTEM(state, obj) {
        state.system = obj;
    }
}
const actions = {
    add: ({ commit }, text) => {
        commit('add', text)
    },
    set_tag({ commit }, number) {
        commit(SET_TAG, number)
    },
    set_system({ commit }, obj) {
        commit(SET_SYSTEM, obj)
    }
}


const store = () => new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store;