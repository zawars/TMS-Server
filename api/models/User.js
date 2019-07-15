/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true,
      unique: true
    },
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    phone: {
      type: 'string',
      unique: true,
      required: true
    },
    address: {
      type: 'string',
    },
    city: {
      type: 'string',
      required: true
    },
    country: {
      type: 'string',
      required: true
    },
    isBlocked: {
      type: 'boolean',
      defaultsTo: false
    },
    isVerified: {
      type: 'boolean',
      defaultsTo: false
    },
    isPasswordChanged: {
      type: 'boolean',
      defaultsTo: false
    },
    role: {
      type: 'string',
      isIn: ['Admin', 'Customer', 'Vendor', 'Agent'],
      required: true
    },
    Permission: {
      type: 'json',
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
  },

  customToJSON: function () {
    return _.omit(this, ['password'])
  },

  beforeCreate: async (values, next) => {
    bcrypt.hash(values.password, 10, (err, hash) => {
      values.password = hash;
      next();
    });
  },

  beforeUpdate: async (values, next) => {
    if (values.password) {
      bcrypt.hash(values.password, 10, (err, hash) => {
        values.password = hash;
        next();
      });
    } else {
      next();
    }
  }

};

