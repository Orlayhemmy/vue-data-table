<template>
  <div id='app-table'>
   <table>
    <thead>
      <tr>
        <th
          v-for='entry in tableHead'
          v-bind:key='entry[".key"]'
        >
          {{entry.title}}
          <span v-if='entry.sortable'> &#x25BC; </span>
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  name: 'app-table',
  props: ['tableHead'],
  methods: {
    sortData() {}
  },
};
</script>
<style lang='scss' scoped>
@import '../assets/styles/table.scss';
</style>
