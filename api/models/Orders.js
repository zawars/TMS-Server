/**
 * Orders.js
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
    orderNumber: {
      type: 'string',
      unique: true
    },
    status: {
      type: 'string'
    },
    instructions: {
      type: 'string'
    },
    bolNumber: {
      type: 'string'
    },
    refNumType: {
      type: 'string'
    },
    refNumValue: {
      type: 'string'
    },
    pickUpDetails: {
      type: 'json'
    },
    dropOfDetails: {
      type: 'json'
    },
    freight: {
      type: 'json'
    },
    services: {
      type: 'json'
    },
    isPlaced: {
      type: 'boolean'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    customer: {
      model: 'tradingPartners'
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
    UtilityService.orderCounter++;
    values.uid = UtilityService.orderCounter;
    values.orderNumber = 'SO' + UtilityService.orderCounter;
    cb();
  }

};

