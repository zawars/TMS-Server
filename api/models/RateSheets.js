/**
 * RateSheets.js
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
      type: 'string'
    },
    description: {
      type: 'string'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    contract: {
      model: 'contracts'
    },
    rateType: {
      model: 'dropdownMapper'
    },
    rateCalcUOM: {
      model: 'dropdownMapper'
    },
    rateCalcType: {
      model: 'dropdownMapper'
    },
    rateBreaks: {
      model: 'dropdownMapper'
    },
    rateBreakUOM: {
      model: 'dropdownMapper'
    },
    currency: {
      model: 'dropdownMapper'
    },


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    rates: {
      collection: 'rates',
      via: 'rateSheet'
    },
  },

  beforeCreate: (values, cb) => {
    UtilityService.rateSheetCounter++;
    values.uid = UtilityService.rateSheetCounter;
    cb();
  }

};
