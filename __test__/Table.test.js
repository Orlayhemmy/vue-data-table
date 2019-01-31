import Vue from 'vue';
import Vuex from 'vuex';
import Table from '../src/components/Table';
import { mount } from '@vue/test-utils';

Vue.use(Vuex);

describe('', () => {
  const actions = {
    sortTableData: jest.fn()
  }

  const store = new Vuex.Store({
    actions,
  });
  const wrapper = mount(Table, {
    propsData: {
      tableHead: [
        {
          title: 'item_sold',
          sortable: true,
        }, 
        {
          title: 'quantity',
          sortable: true,
        },
        {
          title: 'date',
          sortable: true,
        }
      ]
    },
    slots: {
      default: `
      <tr>
      <td>Eggs</td>
      <td>20</td>
      <td>29-01-2019</td>
      </tr>
      <tr>
      <td>Milk</td>
      <td>2</td>
      <td>29-01-2019</td>
      </tr>
      `
    },
    store,
  });

  it('', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have 1 table with 4 table columns', () => {
    expect(wrapper.findAll('table').length).toBe(1);
    expect(wrapper.findAll('th').length).toBe(4);
  });

  it('Each table head column should contain the right data', () => {
    const table_head = wrapper.findAll('th');
    expect(table_head.at(0).html()).toContain('item_sold')
    expect(table_head.at(1).html()).toContain('quantity')
    expect(table_head.at(2).html()).toContain('date')
    expect(table_head.at(3).text()).toBe('Actions')
  });

  it('should contain the right number of table rows', () => {
    const table_tr = wrapper.find('tbody').findAll('tr');
    expect(table_tr.length).toEqual(2);
  })

  it('slot should contain the data passed to the table component', () => {
    const table_td = wrapper.findAll('tr').at(1).findAll('td');
    expect(table_td.at(0).text()).toBe('Eggs');
    expect(table_td.at(1).text()).toBe('20');
    expect(table_td.at(2).text()).toBe('29-01-2019');
  });

  it('should sort table data when any sortable column is clicked', () => {
    const table_head = wrapper.findAll('th');
    table_head.at(0).trigger('click');

    expect(actions.sortTableData).toHaveBeenCalled();
  })
})