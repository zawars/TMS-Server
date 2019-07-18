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
      unique: true
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
    contractType: {
      model: 'dropdownMapper'
    },
    currency: {
      model: 'dropdownMapper'
    },
    contractStatus: {
      model: 'dropdownMapper'
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
    values.uid = UtilityService.contractCounter;
    cb();
  }

};
