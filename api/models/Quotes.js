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
    freight: {
      type: 'json'
    },
    services: {
      type: 'json'
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

  },

  beforeCreate: (values, cb) => {
    UtilityService.quoteCounter++;
    values.uid = UtilityService.quoteCounter;
    values.quoteNumber = 'ROH' + UtilityService.quoteCounter;
    cb();
  }

};

