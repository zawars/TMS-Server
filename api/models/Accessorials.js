/**
 * Accessorials.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    description: {
      type: 'string'
    },
    effectiveDate: {
      type: 'string'
    },
    fixedCharge: {
      type: 'number'
    },
    minCharge: {
      type: 'number'
    },
    maxCharge: {
      type: 'number'
    },
    perUnitCharge: {
      type: 'number'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    contract: {
      model: 'contracts'
    },
    service: {
      model: 'dropdownMapper'
    },
    chargeType: {
      model: 'dropdownMapper'
    },
    chargeUOM: {
      model: 'dropdownMapperChild'
    },
    fixedChargeCurrency: {
      model: 'dropdownMapper'
    },
    minChargeCurrency: {
      model: 'dropdownMapper'
    },
    maxChargeCurrency: {
      model: 'dropdownMapper'
    },
    perUnitChargeCurrency: {
      model: 'dropdownMapper'
    }

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

