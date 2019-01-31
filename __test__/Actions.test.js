import Vuex from 'vuex';
import { actions } from '../src/store';
import db from '../src/firebase';
import { transactions } from '../data.json';

describe('Actions', () => {
  let store;
  let mockSort;
  let mockUpdateState;
  let mockUpdateDescription;
  let mockPopulateTable;
  let mockError;
  const mockFailureObject = {
    doc: jest.fn(() => ({
      update: jest.fn(() => Promise.reject()),
    })),
  };
  const mockSuccessObject = {
    onSnapshot: jest.fn(() => Promise.resolve({ docs: transactions })),
    doc: jest.fn(() => ({
      onSnapshot: jest.fn(() => Promise.resolve({ docs: transactions })),
      update: jest.fn(() => Promise.resolve()),
    })),
  };
  let spy;

  beforeEach(() => {
    mockSort = jest.fn();
    mockUpdateState = jest.fn();
    mockUpdateDescription = jest.fn();
    mockPopulateTable = jest.fn();
    mockError = jest.fn();
    spy = jest.spyOn(db, 'collection');

    store = new Vuex.Store({
      state: { _tableData: {} },
      mutations: {
        sortTableOptions: mockSort,
        updateStateProp: mockUpdateState,
        updateEntryDescription: mockUpdateDescription,
        populateTable: mockPopulateTable,
        displayError: mockError,
      },
      actions: {
        sortTableData: actions.sortTableData,
        toggleInputBox: actions.toggleInputBox,
        updateDescriptionAction: actions.updateDescriptionAction,
        getTransactions: actions.getTransactions,
      },
    });
  });

  it('calls the mocked mutation once', () => {
    store.hotUpdate({
      mutations: { sortTableOptions: mockSort },
    });
    store.dispatch('sortTableData', 'amount');
    expect(mockSort.mock.calls).toHaveLength(1);
  });

  it('calls the mocked mutation once', () => {
    store.hotUpdate({
      mutations: { updateStateProp: mockUpdateState },
    });
    store.dispatch('toggleInputBox', {});
    expect(mockUpdateState.mock.calls).toHaveLength(1);
  });

  it('should dispatch getTransactions and commit a mutation on success', () => {
    store.hotUpdate({
      mutations: { populateTable: mockPopulateTable },
    });

    spy.mockImplementation(() => mockSuccessObject);
    store.dispatch('getTransactions');

    expect(spy).toBeCalled();
    Promise.resolve(() => expect(mockPopulateTable.mock.calls).toHaveLength(1));
  });

  it('should dispatch updateDescriptionAction and commit a mutation on success', () => {
    store.hotUpdate({
      mutations: { updateEntryDescription: mockUpdateDescription },
    });

    spy.mockImplementation(() => mockSuccessObject);
    store.dispatch('updateDescriptionAction');

    expect(spy).toBeCalled();
    Promise.resolve().then(() => {
      expect(mockUpdateDescription.mock.calls).toHaveLength(1);
    });
  });

  it('should commit a mutation when  updateDescriptionAction fails', () => {
    store.hotUpdate({
      mutations: { displayError: mockError },
    });

    spy.mockImplementation(() => mockFailureObject);
    store.dispatch('updateDescriptionAction');

    expect(spy).toBeCalled();
    Promise.reject().then(() => {
      expect(mockError.mock.calls).toHaveLength(1);
    });
  });
});
