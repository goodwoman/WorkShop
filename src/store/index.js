import Vue from 'vue'
import Vuex from 'vuex'
import { getHeartList, getTechologyList, getPolicyList } from "../api/manage"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        resultList: []
    },
    mutations: {
        // updateAll(state, hearts) {
        //     state.heartList = hearts;
        //     state.resultList = state.heartList
        //     console.log(state.heartList)
        // },
        // updateTech(state, tech) {
        //     state.techList = tech;
        // },
        // updatePolicy(state, policy) {
        //     state.policyList = policy;
        // },
        updateResultList(state, result) {
            state.resultList = result;
            console.log(state.resultList + "---------");
        }
    },
    actions: {
        // handlerHeartList(state) {
        //     getHeartList().then((res) => {
        //         console.log(res)
        //         state.commit("updateHeart", res)
        //     })
        // },
        // handlerTechList(state) {
        //     getTechologyList().then((res) => {
        //         state.commit("updateTech", res)
        //     })
        // },
        // handlerPolicyList(state) {
        //     getPolicyList().then((res) => {
        //         state.commit("updatePolicy", res)
        //     })
        // },
        // handlerResult(state) {
        //     getPolicyList().then((res) => {
        //         state.commit("updatePolicy", res)
        //     })
        // }
    },
    modules: {}
})