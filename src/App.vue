<template>
  <div id='app'>
    <div class='page-head'>
      <span class='page-head__page-title'>Transactions</span>
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
import Table from './components/Table.vue';

export default {
  name: 'app',
  components: {
    'data-table': Table
  },
  data() {
    return {
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
  created() {
    this.$store.dispatch('getTransactions');
  },
};
</script>
<style lang='scss' scoped>
@import './assets/styles/app.scss';
</style>
