import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, within } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Tests for Trybe Wallet application', () => {
  test('Login Component ', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailElement = screen.getByPlaceholderText('Usuário');
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByPlaceholderText('Senha');
    expect(passwordElement).toBeInTheDocument();

    const loginButton = screen.getByRole('button');
    expect(loginButton).toBeInTheDocument();

    userEvent.type(emailElement, 'daniel@wolter.com');
    userEvent.type(passwordElement, '12345678');
    userEvent.click(loginButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const userEmail = screen.getByRole('heading', {
      name: /daniel@wolter\.com/i,
    });
    expect(userEmail).toBeInTheDocument();

    const brlText = screen.getByText(/brl/i);
    expect(brlText).toBeInTheDocument();
  });
  it('Testando a página wallet', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const newValueInput = screen.getByRole('textbox');
    expect(newValueInput).toBeInTheDocument();

    const currencyseletor = screen.getAllByRole('combobox');
    const num = 3;
    expect(currencyseletor.length).toBe(num);

    const inputValue = screen.getByPlaceholderText(/value/i);
    expect(inputValue).toBeInTheDocument();

    const addBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(addBtn).toBeInTheDocument();

    userEvent.type(inputValue, '1');
    userEvent.click(addBtn);

    const totalValue = await screen.findByTestId('total-field');
    expect(totalValue).toBeInTheDocument();
    expect(totalValue).toHaveTextContent('0.00');

    const DescricaoTitle = screen.getByRole('columnheader', {
      name: /descrição/i });
    expect(DescricaoTitle).toBeInTheDocument();

    const tagTitle = screen.getByRole('columnheader', {
      name: /tag/i });
    expect(tagTitle).toBeInTheDocument();

    const metodoTitle = screen.getByRole('columnheader', {
      name: /método de pagamento/i });
    expect(metodoTitle).toBeInTheDocument();

    const cambioTitle = screen.getByRole('columnheader', {
      name: /câmbio utilizado/i });
    expect(cambioTitle).toBeInTheDocument();

    const conversaoTitle = screen.getByRole('columnheader', {
      name: /valor convertido/i });
    expect(conversaoTitle).toBeInTheDocument();

    const moedasTitle = screen.getByRole('columnheader', {
      name: /moeda de conversão/i });
    expect(moedasTitle).toBeInTheDocument();

    const editDelTitle = screen.getByRole('columnheader', {
      name: /editar\/excluir/i });
    expect(editDelTitle).toBeInTheDocument();
  });
  it('Testando Table Component', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    const TOTAL_FIELD = 'total-field';

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(screen.getByTestId(TOTAL_FIELD).innerHTML).toBe('0.00');
    userEvent.type(screen.getByTestId('value-input'), '2');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    await waitFor(async () => {
      const row = screen.getByRole('row', {
        name:
        /alimentação dinheiro 2\.00 dólar americano\/real brasileiro 4\.75 9\.51 real/i,
      });
      expect(within(row).getByRole('cell', {
        name: /alimentação/i,
      })).toBeInTheDocument();

      expect(within(row).getByRole('cell', {
        name: /dinheiro/i,
      })).toBeInTheDocument();

      expect(within(row).getByRole('cell', {
        name: /dólar americano\/real brasileiro/i,
      })).toBeInTheDocument();

      expect(within(row).getByRole('cell', {
        name: /4\.75/i,
      })).toBeInTheDocument();

      expect(within(row).getByRole('cell', {
        name: /9\.51/i,
      })).toBeInTheDocument();

      const cell = screen.getByRole('cell', {
        name: /editar excluir/i,
      });

      expect(screen.getByTestId(TOTAL_FIELD).innerHTML).toBe('9.51');
      const buttonExcluir = screen.getByRole('button', {
        name: /excluir/i,
      });

      const buttonEdit = within(cell).getByRole('button', {
        name: /editar/i,
      });
      expect(buttonEdit).toBeInTheDocument();
      userEvent.click(buttonEdit);

      expect(buttonExcluir).toBeInTheDocument();
      userEvent.click(buttonExcluir);
      expect(buttonExcluir).not.toBeInTheDocument();
      expect(screen.getByTestId(TOTAL_FIELD).innerHTML).toBe('0.00');
    });
  });
});
