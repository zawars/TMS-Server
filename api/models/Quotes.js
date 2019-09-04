/**
 * Quotes.js
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
    quoteNumber: {
      type: 'string',
      unique: true
    },
    name: {
      type: 'string'
    },
    quoteDate: {
      type: 'string'
    },
    pickUpDate: {
      type: 'string'
    },
    pickUpFromCity: {
      type: 'json'
    },
    deliverToCity: {
      type: 'json'
    },
    services: {
      type: 'json'
    },
    appliedRate: {
      type: 'number'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    customer: {
      model: 'tradingPartners'
    },
    pickUpFromCountry: {
      model: 'dropdownMapper'
    },
    deliverToCountry: {
      model: 'dropdownMapper'
    },
    rate: {
      model: 'rates'
    },
    vendor: {
      model: 'tradingPartners'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    freights: {
      collection: 'freights',
      via: 'quote'
    },

  },

  beforeCreate: (values, cb) => {
    UtilityService.quoteCounter++;
    values.uid = UtilityService.quoteCounter;
    values.quoteNumber = 'ROH' + UtilityService.quoteCounter;
    cb();
  }

};

