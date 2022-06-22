const bcrypt = require("bcrypt")

exports.compareAsync = (password1, password2) => {
  return new Promise(function(resolve, reject) {
      bcrypt.compare(password1, password2, function(err, res) {
          if (err) {
               reject(err);
          } else {
               resolve(res);
          }
      });
  });
}