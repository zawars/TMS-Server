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
        },
        {
          phone: data.phone
        },
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
        subject: "Verification",
        message: `Please use this <code>${authCode}</code> token to verify your account.`
      }, (err) => {
        if (err) {
          res.ok({
            message: 'Error sending email.'
          });
        } else {
          res.ok({
            user,
            message: 'Verification token sent to your email. Please verify.'
          });
        }
      });
    } else {
      res.ok({
        message: 'User already exists with either email, username or phone.'
      });
    }
  },

  sendEmail: (req, res) => {
    EmailService.sendMail({
      email: req.body.email,
      message: req.body.message,
      subject: req.body.subject
    }, (err) => {
      if (err) {
        res.forbidden({
          message: "Error sending email."
        });
      } else {
        res.send({
          message: "Email sent."
        });
      }
    })
  }

};
