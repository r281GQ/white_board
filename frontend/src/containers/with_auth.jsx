import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default WrappedComponent => {
  const Auth = props =>
  {
    console.log('dfgdf');
    return props.isAuthenticated ? <WrappedComponent {...props} /> : null;
  }

  Auth.propTypes = {
    isAuthenticated: PropTypes.any
  };
  console.log('sdfsdfs')
  return connect(state => ({
    isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
  }))(Auth);
};
