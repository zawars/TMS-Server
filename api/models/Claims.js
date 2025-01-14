/**
 * Claims.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    uid: {
      type: 'number',
      unique: true
    },
    bolNumber: {
      type: 'string'
    },
    proNumber: {
      type: 'string'
    },
    claimFor: {
      type: 'string'
    },
    claimantName: {
      type: 'string'
    },
    address1: {
      type: 'string'
    },
    address2: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    fax: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    decision: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    city: {
      type: 'json'
    },
    postalCode: {
      type: 'json'
    },
    claimTypes: {
      type: 'json'
    },
    comments: {
      type: 'json',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    customer: {
      model: 'tradingPartners'
    },
    state: {
      model: 'states'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    attachments: {
      collection: 'attachments',
      via: 'claim'
    },

  },

  beforeCreate: (values, cb) => {
    UtilityService.claimCounter++;
    values.uid = UtilityService.claimCounter;
    cb();
  }

};
