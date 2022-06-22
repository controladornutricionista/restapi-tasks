const crypto = require("crypto");
const { secretKey } = require("../config")

const secret = secretKey;
const algorithm = "aes-256-cbc";

const key = crypto.scryptSync(secret, "salt", 32);
const iv = Buffer.alloc(16, 0); 

const decrypt = (text = "") => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

const encrypt = (text = '') => {
  const cipher = crypto.createCipheriv(algorithm, key, iv)

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return encrypted
}

module.exports = { decrypt, encrypt };
