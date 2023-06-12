import {
  UPDATE_CURRENT_EXPENSE,
  UPDATE_TOTAL,
  GET_COINS,
  ON_EDITOR,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  totalExpenses: '0',
  isDisabled: false,
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_COINS:
    return { ...state, currencies: action.payload };
  case UPDATE_TOTAL:
    return {
      ...state,
      totalExpenses: returnTotal(state.expenses),
    };
  case UPDATE_CURRENT_EXPENSE:
    return handleUpdateCurrentExpense(state, action.payload);
  case ON_EDITOR:
    return {
      ...state,
      isDisabled: !state.isDisabled,
      idToEdit: action.id,
    };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
