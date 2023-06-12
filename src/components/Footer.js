import React, { Component } from 'react';
import '../sass/components/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <p className="footerColor">
          Desenvolvido em React por
          {' '}
          <a href="https://github.com/RenanCampos1"><span className="footerColor">Renan Campos</span></a>
        </p>
      </footer>
    );
  }
}

export default Footer;
