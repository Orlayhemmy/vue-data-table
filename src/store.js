import Vue from 'vue';
import Vuex from 'vuex';
import db from './firebase';

Vue.use(Vuex);
Vue.use(db);

export const state = {
  tableData: [],
  dataId: '',
  description: '',
  error: '',
};

export const getters = {
  tableData(state) {
    return state.tableData;
  },
  getDescription(state) {
    return state.description;
  },
  getDataId(state) {
    return state.dataId;
  },
};

export const mutations = {
  updateEntryDescription(state) {
    state.tableData = state.tableData.map(entry =>
      (entry.dataKey === state.dataId
        ? { ...entry, description: state.description }
        : entry
      ));
    state.dataId = null;
  },
  updateStateProp(state, payload) {
    state.description = payload.content;
    state.dataId = payload.id ? payload.id : null;
  },
  sortTableOptions(state, payload) {
    const key = payload.toLowerCase();
    state.tableData = state.tableData.sort((a, b) => (a[`${key}`] > b[`${key}`] ? 1 : b[`${key}`] > a[`${key}`] ? -1 : 0));
  },
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
  displayError(state, payload) {
    state.error = payload;
  },
};

export const actions = {
  sortTableData(context, payload) {
    context.commit('sortTableOptions', payload);
  },
  toggleInputBox(context, payload) {
    context.commit('updateStateProp', payload);
  },
  updateDescriptionAction(context) {
    return db.collection('transactions').doc(context.state.dataId).update({
      description: context.state.description,
    }).then(() => context.commit('updateEntryDescription'))
      .catch(() => context.commit('displayError', 'Data update unsuccessful! try again'));
  },
  getTransactions(context, payload = null) {
    const { filterParams, filterBy } = payload || {};
    let query;

    if (payload) {
      query = Object.values(filterParams)[0] > Object.values(filterParams)[1]
        ? db.collection('transactions').where(filterBy, '>', Object.values(filterParams)[1]).where(filterBy, '<', Object.values(filterParams)[0])
        : db.collection('transactions').where(filterBy, '>', Object.values(filterParams)[0]).where(filterBy, '<', Object.values(filterParams)[1])
    } else {
      query = db.collection('transactions');
    }

    query.onSnapshot((snapshot) => {
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
