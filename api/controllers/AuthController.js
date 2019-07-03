/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const speakEasy = require('speakeasy');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    let data = req.body;

    let user = await User.findOne({
      email: data.email
    });

    if (user) {
      if (!user.isPasswordChanged) {
        if (user.isVerified) {
          bcrypt.compare(data.password, user.password, async (err, result) => {
            if (err) {
              res.forbidden('Invalid password.');
            } else {
              if (result) {
                jwt.sign(user, sails.config.session.secret, (err, token) => {
                  RedisService.set(token, user, () => {
                    console.log(`${user.email} logged in.`);
                    res.ok({
                      token,
                      user,
                      message: 'Logged in successfully.'
                    });
                  });
                });
              } else {
                res.status(200).json({
                  message: 'Invalid password.'
                });
              }
            }
          });
        } else {
          res.ok({
            message: 'User is not verified.'
          });
        }
      } else {
        res.ok({
          message: 'You have not configured your new password yet.'
        });
      }
    } else {
      res.status(200).json({
        message: 'User does not exist.'
      });
    }
  },

  verify: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user.isVerified == false) {
        let tokenValidates = speakEasy.totp.verify({
          secret: sails.config.session.secret + req.body.email,
          encoding: 'base32',
          token: req.body.token,
          digits: 8,
          step: 300
        });

        if (tokenValidates) {
          // let user = await User.findOne({ email: req.body.email });
          let updatedUser = await User.update({
            email: req.body.email
          }).set({ isVerified: true }).fetch();
          updatedUser = updatedUser[0];

          jwt.sign(updatedUser, sails.config.session.secret, (err, token) => {
            RedisService.set(token, updatedUser, () => {
              console.log(`${updatedUser.email} logged in.`);

              res.ok({
                token,
                user: updatedUser,
                message: 'User verified successfully.'
              });
            });
          });
        } else {
          res.status(200).json({
            message: 'Invalid authentication token'
          });
        }
      } else {
        res.status(200).json({
          message: 'User already verified.'
        });
      }
    } catch (error) {
      res.status(200).json({
        message: error
      });
    }
  },

  resendToken: async (req, res) => {
    let user = await User.findOne({ email: req.body.email }).populateAll();
    if (user.isVerified == false) {
      let authCode = speakEasy.totp({
        digits: 8,
        secret: sails.config.session.secret + user.email,
        encoding: 'base32',
        step: 300
      });


      // RedisService.set(authCode, user, () => {
      EmailService.sendMail({
        email: user.email,
        subject: 'User Verification',
        message: `Please use this <code>${authCode}</code> token to verify your account. `
      }, (err) => {
        if (err) {
          res.forbidden('Error sending email.');
        }

        res.ok({
          user,
          message: 'Verification token sent to your email. Please verify.'
        });
      });
      // });
    } else {
      res.ok({
        message: 'User already verified.'
      })
    }
  },

  forgetPassword: async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      user = await User.update({ email: req.body.email }).set({ isVerified: false, isPasswordChanged: true }).fetch();
      user = user[0];

      let authCode = speakEasy.totp({
        digits: 8,
        secret: sails.config.session.secret + user.email,
        encoding: 'base32',
        step: 300
      });


      // RedisService.set(authCode, user, () => {
      EmailService.sendMail({
        email: user.email,
        subject: 'User Verification',
        message: `Please use this <code>${authCode}</code> token to verify your account. `
      }, (err) => {
        if (err) {
          res.forbidden('Error sending email.');
        }

        res.ok({
          user,
          message: 'Verification token sent to your email. Please verify.'
        });
      });
      // });
    } else {
      res.ok({
        message: 'There is no user exists with this email.'
      });
    }
  },

  forgetVerify: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user.isVerified == false) {
        let tokenValidates = speakEasy.totp.verify({
          secret: sails.config.session.secret + req.body.email,
          encoding: 'base32',
          token: req.body.token,
          digits: 8,
          step: 300
        });

        if (tokenValidates) {
          let updatedUser = await User.update({
            email: req.body.email
          }).set({ isVerified: true }).fetch();
          updatedUser = updatedUser[0];

          res.ok({
            // token,
            user: updatedUser,
            message: 'User verified successfully.'
          });
        } else {
          res.status(200).json({
            message: 'Invalid authentication token'
          });
        }
      } else {
        res.status(200).json({
          message: 'User already verified.'
        });
      }
    } catch (error) {
      res.status(200).json({
        message: error
      });
    }
  },

  // Rewrite token when user updates his password. A new token must be needed.
  renewPassword: async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      if (user.isPasswordChanged) {
        if (user.isVerified) {
          bcrypt.compare(req.body.oldPassword, user.password, async (err, result) => {
            if (err) {
              res.forbidden('Invalid old password.');
            } else {
              if (result) {
                user = await User.update({
                  email: user.email
                }).set({
                  password: req.body.password,
                  isPasswordChanged: req.body.isPasswordChanged
                }).fetch();
                user = user[0];

                jwt.sign(user, sails.config.session.secret, (err, token) => {
                  RedisService.set(token, user, () => {
                    console.log(`${user.email} logged in.`);
                    res.ok({
                      token,
                      user,
                      message: 'Password changed successfully.'
                    });
                  });
                });
              } else {
                res.status(200).json({
                  message: 'Invalid old password.'
                });
              }
            }
          });
        } else {
          res.ok({
            message: 'User is not verified.'
          });
        }
      } else {
        res.ok({
          message: 'Invalid request for password change.'
        });
      }
    } else {
      res.status(200).json({
        message: 'User does not exist.'
      });
    }
  },

  logout: async (req, res) => {
    const bearerToken = req.headers['authorization'].split(' ')[1];
    RedisService.del(bearerToken, () => {
      res.ok({
        message: 'User logged out successfully.'
      });
    });
  },

};

