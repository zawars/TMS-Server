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
    // deliveryDate: {
    //   type: 'string'
    // },
    // description: {
    //   type: 'string'
    // },
    // huCNT: {
    //   type: 'string'
    // },
    // pieces: {
    //   type: 'string'
    // },
    // nmFC: {
    //   type: 'string'
    // },
    // weight: {
    //   type: 'string'
    // },
    // length: {
    //   type: 'string'
    // },
    // width: {
    //   type: 'string'
    // },
    // height: {
    //   type: 'string'
    // },
    // cube: {
    //   type: 'string'
    // },
    // density: {
    //   type: 'string'
    // },
    // hazmatUN: {
    //   type: 'string'
    // },

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
    // product: {
    //   model: 'dropdownMapper'
    // },
    // handlingUnit: {
    //   model: 'dropdownMapper'
    // },
    // lengthUnit: {
    //   model: 'dropdownMapper'
    // },
    // cubeUnit: {
    //   model: 'dropdownMapper'
    // },
    // class: {
    //   model: 'dropdownMapper'
    // },
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
    values.quoteNumber = 'ROH-' + UtilityService.quoteCounter;
    cb();
  }

};

