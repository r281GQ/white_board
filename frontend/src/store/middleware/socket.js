import io from 'socket.io-client';

export default () => {
  let socket = null;
  return store => next => action => {
    switch ('') {
      default:
        return next(action);
    }
  };
};
