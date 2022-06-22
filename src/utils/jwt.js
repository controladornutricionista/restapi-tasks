const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const { encrypt } = require("./crypto");
const { expirationJWTTime, jwtSecret, timezone } = require("../config")

const generateToken = (userId = "") => {
  
  console.log("secret",jwtSecret);
  const id = String(userId)

  const JWT_EXPIRATION = expirationJWTTime;
  const JWT_SECRET = jwtSecret

  const date = moment().tz(timezone).add(JWT_EXPIRATION, 'minutes').valueOf();

  const expiration = Math.floor(date / 1000);

  const millisExpiredTime = expiration * 1000;

  const expiredDate = moment(millisExpiredTime).tz(timezone).format();

  // returns signed and encrypted token
  const tokenObj = {
    accessToken: encrypt(
      jwt.sign(
        {
          userId: id,
          exp: expiration,
        },
        JWT_SECRET
      )
    ),
    expiredIn: millisExpiredTime,
    expiredDate: expiredDate,
  };
  return tokenObj;
};

module.exports = { generateToken };