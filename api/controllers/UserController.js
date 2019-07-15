/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const speakEasy = require('speakeasy');

module.exports = {
  create: async (req, res) => {
    let data = req.body;
    let check = await User.findOne({
      or: [{
          username: data.username
        },
        {
          email: data.email
        }
      ]
    });

    if (check == undefined) {
      let user = await User.create(data).fetch();
      let authCode = speakEasy.totp({
        digits: 8,
        secret: sails.config.session.secret + user.email,
        encoding: 'base32',
        step: 300
      });

      EmailService.sendMail({
        email: user.email,
        subject: 'User Verification',
        message: `Please use this <code>${authCode}</code> token to verify your account. `
      }, (err) => {
        if (err) {
          res.ok({
            message: 'Error sending email.'
          });
        }

        res.ok({
          user,
          message: 'Verification token sent to your email. Please verify.'
        });
      });
    } else {
      res.ok({
        message: 'User already exists with either email or username.'
      });
    }
  },

};
