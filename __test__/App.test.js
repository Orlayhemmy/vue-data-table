import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from '@vue/test-utils';
import App from '../src/App';
import { transactions } from '../data.json';

Vue.use(Vuex);

describe('App.vue', () => {
  const state = {
    _tableData: transactions
  }
  const actions = {
    getTransactions: jest.fn(),
    updateDescriptionAction: jest.fn(),
    toggleInputBox: jest.fn(),
  }
  const getters = {
    tableData: () => state._tableData,
  }

  const mutations = {
    updateStateProp: jest.fn(),
  }
  const store = new Vuex.Store({
    actions,
    mutations,
    getters,
    state,
  });
  const wrapper = mount(App, {
    store,
  });

  it('should setup without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a page title', () => {
    expect(wrapper.find('.page-head__page-title').text()).toEqual('Transactions');
  });

  it('should have a filter button', () => {
    expect(wrapper.find('.filter button').exists()).toBe(true);
  });

  it('should not display the content of the filter modal', () => {
    expect(wrapper.find('.filter-content').exists()).toBe(false);
  });

  it('should display the content of the filter modal when the filter button is clicked', () => {
    wrapper.find('.filter button').trigger('click');
    expect(wrapper.find('.filter-content').exists()).toBe(true);
  });

  it('should display an error when no data is inputted and submit button is clicked', () => {
    const errors = wrapper.find('.filter-content span');
    wrapper.find('.filter-prop p').trigger('click');
    wrapper.find('.modal-content button').trigger('click');
    
    expect(wrapper.vm.error.message).toContain('No data inputted');
    expect(errors.html()).toContain('No data inputted')
  });
  
  it('should display an error when minimum value is greater than the maximum inputted', () => {
    const errors = wrapper.findAll('.filter-content span');

    const input = wrapper.findAll('.filter-prop input');
    input.at(0).element.value = "900";
    input.at(0).trigger('input');
    
    input.at(1).element.value = "400";
    input.at(1).trigger('input');
    
    wrapper.find('.modal-content button').trigger('click');
    
    expect(wrapper.vm.error.amount)
      .toContain('Maximum amount should greater than minimum amount');
    expect(errors.at(1).html())
      .toContain('Maximum amount should greater than minimum amount')
  });

  it('should dispatch getTransaction action with the expected parameter', () => {
    const table_td = wrapper.findAll('tr').at(1).findAll('td');
    expect(table_td.at(0).text()).toBe('Kyra Lester');
    expect(table_td.at(2).text()).toBe("345.54");
    expect(table_td.at(3).text()).toBe("2017-07-23T04:24:49-07:00");
    
    const input = wrapper.findAll('.filter-prop input');
    input.at(0).element.value = "300";
    input.at(0).trigger('input');
    
    input.at(1).element.value = "500";
    input.at(1).trigger('input');
    
    wrapper.find('.modal-content button').trigger('click');

    expect(actions.getTransactions).toHaveBeenCalled();
  });

  it('table rows length should equal the length of transaction data', () => {
    expect(wrapper.find('table tbody').findAll('tr').length).toEqual(transactions.length);
  });

  it('should display input field to edit selected table cell', () => {
    wrapper.find('tbody tr').findAll('td').at(1).find('img').trigger('click');
    
    const input = wrapper.find('tbody tr').find('input')
    input.element.value = "Made a payment for electricity bill";
    input.trigger('input');

    wrapper.findAll('.action-buttons span').at(0).trigger('click');

    expect(actions.updateDescriptionAction).toHaveBeenCalled();
  })
})