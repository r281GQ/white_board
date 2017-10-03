import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
//import styled from 'styled-components';

import { login, logout } from '../store/action_creators/auth';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <div>
        <input
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
        />
        <input
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
          type="text"
        />
        <button
          onClick={() =>
            this.props.login({
              email: this.state.email,
              password: this.state.password
            })}
        >
          log in
        </button>

        <button onClick={() => this.props.logout()}>log out</button>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.any,
  logout: PropTypes.any
};

export default connect(null, { login, logout })(LoginContainer);
