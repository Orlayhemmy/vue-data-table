import { mutations } from '../src/store';

describe('Mutations', () => {
  let state;
  let transactions;

  beforeEach(() => {
    transactions = [
      {
        dataKey: 1,
        name: 'John Doe',
        description: 'Donated a sum to charity',
        amount: 90,
      },
      {
        dataKey: 2,
        name: 'Janet Marque',
        description: 'Ordered for 35 crates of eggs',
        amount: 107.5,
      },
      {
        dataKey: 3,
        name: 'Buckminster Alvarado',
        description: 'dui, in sodales elit erat vitae risus. Duis a mi',
        amount: 67.08,
      },
      {
        dataKey: 4,
        name: 'Athena Smith',
        description: 'massa lobortis ultrices. Vivamus rhoncus.',
        amount: 73.67,
      },
    ];
    state = {
      tableData: transactions,
      dataId: 1,
      description: 'donated a sum to charity through bank wire',
      error: '',
    };
  });
  it('updates the description value in state', () => {
    mutations.updateEntryDescription(state);

    expect(state.tableData[0].description).toEqual('donated a sum to charity through bank wire');
    expect(state.dataId).toEqual(null);
  });

  it('updates the state props with the payload passed as argument', () => {
    const payload = { content: 'Account opening', id: 234 };
    mutations.updateStateProp(state, payload);

    expect(state.dataId).toEqual(234);
    expect(state.description).toEqual('Account opening');
  });

  it('sorts table options', () => {
    expect(state.tableData[0]).toEqual(
      { dataKey: 1,
        name: 'John Doe',
        description: 'Donated a sum to charity',
        amount: 90,
      },
    );

    mutations.sortTableOptions(state, 'amount');

    expect(state.tableData[0]).toEqual({ dataKey: 3,
      name: 'Buckminster Alvarado',
      description: 'dui, in sodales elit erat vitae risus. Duis a mi',
      amount: 67.08,
    });
  });

  it('should update the state value with the error message', () => {
    mutations.displayError(state, 'data not found');
    expect(state.error).toEqual('data not found');
  });
});
