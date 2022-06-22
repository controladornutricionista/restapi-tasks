const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;
var { ObjectId } = require("mongodb")

const { decrypt } = require('../../../utils/crypto');
const User = require("../database/Usuarios");
const httpStatus = require("http-status");
const { jwtSecret } = require("../../../config")

const JWTStrategy = Strategy;
const JWT_SECRET = jwtSecret

const jwtExtractor = (req) => {
    let token = null
    if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '').trim()
    } else if (req.body.token) {
        token = req.body.token.trim()
    } else if (req.query.token) {
        token = req.query.token.trim()
    }
    if (token) {
        // Decrypts token
        token = decrypt(token)
    } else throw new Error("Token no encontrado")

    return token
}


const jwtOptions = {
    jwtFromRequest: jwtExtractor,
    secretOrKey: JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOptions, (jwtPayload, cb) => {
    const userId = jwtPayload.userId
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    if (ObjectId.isValid(userId)) {
        User.findById(userId, (err, user) => {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            } else {
                return cb(null, user)
            }
        }).populate("rol").populate("persona");
    }
    else throw new Error('Error de autenticación')
});

passport.use(jwtLogin);
