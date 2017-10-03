import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Login from './login';
import Chat from './chat';

const App = () => (
  <div>
    <Login />
    <Chat />
  </div>
);

App.propTypes = {};

export default App;
