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
          <td>
            <div class='dt_description' v-show='getDataId !== entry.dataKey'>
              {{entry.description}}
              <img
                src='./assets/images/edit.svg'
                alt='edit-icon'
                @click='toggleInputBox(entry)'
              >
            </div>
            <div class='dt_description_input' v-show='getDataId === entry.dataKey'>
              <input type='text' v-model='getDescription'>
              <div class='action-buttons'>
                <span @click='updateDescription'>&#x2713;</span>
                <span @click='toggleInputBox'>&#x2715;</span>
              </div>
            </div>
          </td>
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
    getDescription: {
      get() {
        return this.$store.getters.getDescription;
      },
      set(value) {
        const payload = {
          content: value,
          id: this.getDataId,
        };
        return this.$store.commit('updateStateProp', payload);
      },
    },
    getDataId() {
      return this.$store.getters.getDataId;
    },
  },
  methods: {
    toggleInputBox(data = null) {
      const payload = {
        id: data ? data.dataKey : null,
        content: data ? data.description : null
      };
      this.$store.dispatch('toggleInputBox', payload);
    },
    updateDescription() {
      this.$store.dispatch('updateDescriptionAction');
    },
    setFilter(value) {
      this.filterBy = value;
      this.searchCriteria = { ...this.initialState };
      this.error = {
        date: '',
        amount: '',
        message: '',
      }
    },
    filterData() {
      let filterParams = {};
      const { startDate, endDate, minAmount, maxAmount } = this.searchCriteria;
      const validInput = this.validateUserInputs();
      if (validInput) {
        this.$refs.filter.toggleModal();
        minAmount && (filterParams.minAmount = Number(minAmount));
        maxAmount && (filterParams.maxAmount = Number(maxAmount));
        startDate && (filterParams.startDate = startDate);
        endDate && (filterParams.endDate = endDate);
        return this.$store.dispatch('getTransactions', {
          filterParams,
          filterBy: this.filterBy,
        });
      }
    },
    validateUserInputs() {
      const { startDate, endDate, minAmount, maxAmount } = this.searchCriteria;
      if (!startDate && !endDate && !minAmount && !maxAmount) {
        this.error.message = 'No data inputted';
        return;
      } else if (maxAmount && (minAmount > maxAmount || !minAmount)) {
        this.error.amount = 'Maximum amount should greater than minimum amount';
        return;
      } else if (endDate && startDate > endDate) {
        this.error.date = 'End date should be greater than start date';
        return;
      }
      return true;
    },
  },
  created() {
    this.$store.dispatch('getTransactions');
  },
};
</script>
<style lang='scss' scoped>
@import './assets/styles/app.scss';
</style>
