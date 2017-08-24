import initialState from './../initial_state';

export default (state = initialState.get('auth'), { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
