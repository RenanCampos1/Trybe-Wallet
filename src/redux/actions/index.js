// Coloque aqui suas actions
const USER_LOGIN = 'USER_LOGIN';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const UPDATE_CURRENT_EXPENSE = 'UPDATE_CURRENT_EXPENSE';
const GET_COINS = 'GET_COINS';
const ON_EDITOR = 'ON_EDITOR';
const ADD_EXPENSE = 'ADD_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

const userLogin = ({ email }) => ({
  type: USER_LOGIN,
  email,
});

const actionGetCoins = (coins) => ({
  type: GET_COINS,
  payload: Object.keys(coins).filter((e) => e !== 'USDT'),
});

const updateTotal = () => ({
  type: UPDATE_TOTAL,
});

const updateCurrentExpense = (name, value) => ({
  type: UPDATE_CURRENT_EXPENSE,
  payload: {
    [name]: value,
  },
});

const onEditor = (id) => ({
  type: ON_EDITOR,
  id,
});

export function fetchApi() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(actionGetCoins(data));
  };
}

const addExpense = (expense, exchanges) => ({
  type: ADD_EXPENSE,
  payload: {
    ...expense,
    exchangeRates: exchanges,
  },
});

export function fetchAddExpense(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(addExpense(expense, data));
  };
}

export const removeAction = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export {
  USER_LOGIN,
  userLogin,
  updateTotal,
  UPDATE_TOTAL,
  updateCurrentExpense,
  UPDATE_CURRENT_EXPENSE,
  GET_COINS,
  actionGetCoins,
  ON_EDITOR,
  onEditor,
  ADD_EXPENSE,
  addExpense,
  REMOVE_EXPENSE,
};
