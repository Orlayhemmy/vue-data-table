import Vue from 'vue';
import Vuex from 'vuex';
import db from './firebase';

Vue.use(Vuex);
Vue.use(db);

export const state = {
  tableData: [],
};

export const getters = {
  tableData(state) {
    return state.tableData;
  },
};

export const mutations = {
  populateTable(state, payload = null) {
    payload && payload.forEach((doc) => {
      const obj = {
        ...doc.data(),
        date: doc.data().date.slice(0, 10),
        dataKey: doc.id,
        id: null,
      };
      state.tableData.push(obj);
    });
  },
};

export const actions = {
  getTransactions(context) {
     db.collection('transactions').onSnapshot((snapshot) => {
      context.state.tableData = [];
      context.commit('populateTable', snapshot.docs);
    });
  },
};

export const store = new Vuex.Store({
  getters,
  mutations,
  actions,
  state,
});
