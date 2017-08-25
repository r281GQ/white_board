module.exports = app => passport => {
  app.get(
    '/api/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/api/auth/whoami', (request, response) => {
    if (!request.user)
      return response.status(401).send({ message: 'Unauthanticated!' });
    return response.status(200).send(request.user);
  });

  app.get(
    '/api/auth/google/callback',
    passport.authenticate('google')
    ,
    (request, response) => {
      process.env.NODE_ENV === 'production'
        ? response.redirect('https://white-board-react.herokuapp.com/app')
        : response.redirect('/app');
    }
  );
};
