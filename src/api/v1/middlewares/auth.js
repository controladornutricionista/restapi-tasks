require("../plugins/passport");

const passport = require("passport");

const requireAuthMiddleware = passport.authenticate('jwt', { session: false, failWithError: true });

module.exports = { requireAuthMiddleware }
