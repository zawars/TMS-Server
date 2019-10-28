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

    bolNumber: {
      type: 'string'
    },
    proNumber: {
      type: 'string'
    },
    claimFor: {
      type: 'string'
    },
    companyName: {
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
    postalCodel: {
      type: 'json'
    },
    city: {
      type: 'json'
    },
    state: {
      type: 'json'
    },
    claimTypes: {
      type: 'json'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    attachments: {
      collection: 'attachments',
      via: 'claim'
    },

  },

};
