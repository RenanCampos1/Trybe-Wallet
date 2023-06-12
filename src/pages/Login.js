import React from 'react';
import { Redirect } from 'react-router-dom';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../redux/actions';
import '../sass/pages/Login.css';
import logo from '../img/Trybe-Wallet.png';
import Footer from '../components/Footer';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      redirect: false,
      focused: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value }, this.disableButton);
  }

  handleSubmit() {
    const { submitLogin } = this.props;
    const { email, password } = this.state;
    submitLogin({ email, password });
    this.setState({ redirect: true });
  }

  handleFocus(name) {
    this.setState({ focused: name });
  }

  disableButton() {
    const { email, password } = this.state;
    const regExpEmail = /^([a-z0-9]{1,}[._]{0,1}[a-z0-9]{1,})*(@[a-z0-9]{1,}.com)$/i;
    const minPassLen = 6;
    if (!email.match(regExpEmail) || password.length < minPassLen) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  }

  render() {
    const { email, password, isDisabled, redirect, focused } = this.state;
    return (
      <div className="Login">
        { redirect && <Redirect to="/carteira" /> }
        { !redirect && (
          <form>
            <header />
            <img className="imglogo" src={ logo } alt="Wallet" />
            <div className="Login-input-container">
              <input
                data-testid="email-input"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleInputChange }
                placeholder="Usuário"
                onFocus={ () => this.handleFocus('email') }
                onBlur={ () => this.handleFocus('') }
              />
            </div>
            <span className={ focused === 'email' ? 'icon-focus' : 'icon-blur' }>
              <FaUserAlt />
            </span>
            <div className="Login-input-container">
              <input
                data-testid="password-input"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleInputChange }
                placeholder="Senha"
                onFocus={ () => this.handleFocus('password') }
                onBlur={ () => this.handleFocus('') }
              />
            </div>
            <span className={ focused === 'password' ? 'icon-focus' : 'icon-blur' }>
              <FaLock />
            </span>
            <button type="button" disabled={ isDisabled } onClick={ this.handleSubmit }>
              ENTRAR
            </button>
          </form>
        ) }
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (state) => dispatch(userLogin(state)),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
