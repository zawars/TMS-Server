/**
 * Rates.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string'
    },
    originCity: {
      type: 'string'
    },
    originState: {
      type: 'string'
    },
    originPostalCode: {
      type: 'string'
    },
    originArea: {
      type: 'string'
    },
    originCountry: {
      type: 'string'
    },
    destinationCity: {
      type: 'string'
    },
    destinationState: {
      type: 'string'
    },
    destinationArea: {
      type: 'string'
    },
    destinationCountry: {
      type: 'string'
    },
    destinationPostalCode: {
      type: 'string'
    },
    minCharge: {
      type: 'number'
    },
    maxCharge: {
      type: 'number'
    },
    weightBreaks: {
      type: 'number'
    },
    appliedMarkup: {
      type: 'number',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    rateSheet: {
      model: 'rateSheets'
    }
  },

};
