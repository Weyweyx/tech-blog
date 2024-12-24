const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      return res.redirect('/login'); // Redirect to the login page if not authenticated
    }
    next();
  };
  
  module.exports = withAuth;