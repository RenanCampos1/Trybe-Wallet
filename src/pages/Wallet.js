import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../sass/pages/Wallet.css';
import Footer from '../components/Footer';

class Wallet extends React.Component {
  render() {
    return (
      <div className="Wallet-container">
        <main className="Wallet">
          <Header />
          <WalletForm />
          <div className="table-container">
            <Table />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
export default Wallet;
