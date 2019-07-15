/**
 * Contracts.js
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
      unique: true,
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
    },
    reference: {
      type: 'string',
    },
    effectiveFrom: {
      type: 'string',
    },
    expiryDate: {
      type: 'string',
    },
    renewalDate: {
      type: 'string',
    },
    currency: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    isClientSpecific: {
      type: 'boolean',
      defaultsTo: false
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    vendor: {
      model: 'tradingPartners'
    },
    client: {
      model: 'tradingPartners'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    rateSheets: {
      collection: 'rateSheets',
      via: 'contract'
    },
  },

  beforeCreate: (values, cb) => {
    UtilityService.contractCounter++;
    values.uid = UtilityService.counter;
    cb();
  }

};
