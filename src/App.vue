<template>
  <div id='app'>
    <div class='page-head'>
      <span class='page-head__page-title'>Transactions</span>
      <div class='filter'>
        <data-filter
          title='Filter'
          action-button-text='Filter'
          :handle-submit='filterData'
          ref='filter'
        >
          <div class='filter-content'>
            <div v-show='filterBy === "amount"' class='filter-prop'>
              <p @click='setFilter("date")'>Filter by date</p>
              <span class='error-message'>{{error.message}}</span>
              <label>Amount</label>
              <span class='error-message'>{{error.amount}}</span>
              <div>
                <input type='number' v-model='searchCriteria.minAmount' placeholder='Min'>
                <input type='number' v-model='searchCriteria.maxAmount' placeholder='Max'>
              </div>
            </div>
            <div v-show='filterBy === "date"' class='filter-prop'>
              <p @click='setFilter("amount")'>Filter by amount</p>
              <label>Date</label>
              <span class='error-message'>{{error.date}}</span>
              <div>
                <input type='date' v-model='searchCriteria.startDate' placeholder='Start'>
                <input type='date' v-model='searchCriteria.endDate' placeholder='End'>
              </div>
            </div>
          </div>
        </data-filter>
      </div>
    </div>
    <div>
      <data-table :table-head='tableHead'>
        <tr v-for='entry in tableData' v-bind:key='entry[".key"]'>
          <td>{{entry.name}}</td>
          <td>{{entry.description}}</td>
          <td>{{entry.amount}}</td>
          <td>{{entry.date}}</td>
          <td>&#x1f5d1;</td>
        </tr>
      </data-table>
    </div>
  </div>
</template>

<script>
import Modal from './components/Modal.vue';
import Table from './components/Table.vue';

export default {
  name: 'app',
  components: {
    'data-filter': Modal,
    'data-table': Table
  },
  data() {
    return {
      initialState: {
        minAmount: process.env.dbUrl,
        maxAmount: '',
        startDate: '',
        endDate: ''
      },
      searchCriteria: { ...this.initialState },
      error: {
        date: '',
        amount: '',
        message: ''
      },
      filterBy: 'amount',
      tableHead: [
        {
          title: 'Name',
          sortable: false,
        },
        {
          title: 'Description',
          sortable: false,
        },
        {
          title: 'Amount',
          sortable: true,
        },
        {
          title: 'Date',
          sortable: true,
        }
      ]
    };
  },
  computed: {
    tableData() {
      return this.$store.getters.tableData;
    },
  },
  methods: {
    setFilter(value) {
      this.filterBy = value;
      this.searchCriteria = { ...this.initialState };
      this.error = {
        date: '',
        amount: '',
        message: '',
      }
    },
    filterData() {}
  },
  created() {
    this.$store.dispatch('getTransactions');
  },
};
</script>
<style lang='scss' scoped>
@import './assets/styles/app.scss';
</style>
