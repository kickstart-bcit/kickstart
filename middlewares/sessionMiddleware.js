// functions used for session management
const userConnector = require('../connectors/usersConnector');

const refreshCookie = async (req, res, next) => {
    if (req.session && req.session.user) {
      let user = await userConnector.fetchUser(req.session.user.users_id);
        if (user) {
          req.session.user = user;
          res.locals.user = user;
        }
    }
    next();
  };

const requireLogin = (req, res, next) => {
    if (!req.session.user) res.redirect('/login');
    else next();
  };

// const requireAdmin = (req, res, next) => {
//     if (req.user.type != "admin") res.redirect('/login');
//     else next();
//   };



module.exports = {
    refreshCookie,
    requireLogin
}