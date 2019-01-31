import { getters } from '../src/store';
import { transactions } from '../data.json';

describe('Getters', () => {
  const state = {
    tableData: transactions,
    dataId: '3',
    description: 'Transfer of funds from wallet to online account',
  };

  it('should return description value in state', () => {
    const desc = getters.getDescription(state);
    expect(desc).toEqual(state.description);
  });

  it('should return dataId value in state', () => {
    const id = getters.getDataId(state);
    expect(id).toEqual(state.dataId);
  });

  it('should return tableData value in state', () => {
    const tbdata = getters.tableData(state);
    expect(tbdata).toEqual(state.tableData);
  });
});
