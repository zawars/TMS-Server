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

    quoteNumber: {
      type: 'number',
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
    freight: {
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
    pickUpFromCity: {
      model: 'dropdownMapper'
    },
    pickUpFromCountry: {
      model: 'dropdownMapper'
    },
    deliverToCity: {
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
    services: {
      collection: 'dropdownMapper',
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

};

