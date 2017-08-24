import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';

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
