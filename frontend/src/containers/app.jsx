import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import io from 'socket.io-client';

io(process.env.REACT_APP_SOCKET_IO_URL);

const App = ({ name }) =>
  <div>
    Works + {name}
  </div>;

App.propTypes = {
  name: PropTypes.string
};

const mapStateToProps = state => {
  return {
    name: state.getIn(['auth', 'name'])
  };
};

export default connect(mapStateToProps)(App);
