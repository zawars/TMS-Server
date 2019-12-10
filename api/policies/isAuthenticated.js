const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller

  const bearerToken = req.headers['authorization'].split(' ')[1];

  jwt.verify(bearerToken, sails.config.session.secret, (err, authData) => {
    if (err) {
      return res.ok({
        message: 'You are not permitted to perform this action. Unauthorized, Token mismatch.'
      });
    } else {
      RedisService.get(authData.id, (result) => {
        if (result != undefined) {
          if (bearerToken == result) {
            return next();
          } else {
            return res.ok({
              message: 'You are not permitted to perform this action. Unauthorized, Invalid request.'
            });
          }
        } else {
          return res.ok({
            message: 'You are not permitted to perform this action. Unauthorized, Invalid request.'
          });
        }
      });
    }
  });

};
