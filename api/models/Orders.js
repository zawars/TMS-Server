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
    pickUpDate: {
      type: 'string'
    },
    deliveryDate: {
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
    pickupfLocation: {
      type: 'string'
    },
    shipperName: {
      type: 'string'
    },
    pickupContact: {
      type: 'string'
    },
    pickupAddress: {
      type: 'string'
    },
    pickupPhone: {
      type: 'string'
    },
    pickupAddress2: {
      type: 'string'
    },
    pickupFax: {
      type: 'string'
    },
    pickupCity: {
      type: 'string'
    },
    pickupEmail: {
      type: 'string'
    },
    pickupPostalCode: {
      type: 'string'
    },
    pickupHours: {
      type: 'string'
    },
    pickupMinutes: {
      type: 'string'
    },
    dropoffLocation: {
      type: 'string'
    },
    consigneeName: {
      type: 'string'
    },
    dropoffContact: {
      type: 'string'
    },
    dropoffAddress: {
      type: 'string'
    },
    dropoffPhone: {
      type: 'string'
    },
    dropoffAddress2: {
      type: 'string'
    },
    dropoffFax: {
      type: 'string'
    },
    dropoffCity: {
      type: 'string'
    },
    dropoffEmail: {
      type: 'string'
    },
    dropoffPostalCode: {
      type: 'string'
    },
    dropoffHours: {
      type: 'string'
    },
    dropoffMinutes: {
      type: 'string'
    },
    pickupCountry: {
      type: 'json'
    },
    dropoffCountry: {
      type: 'json'
    },
    services: {
      type: 'json'
    },
    isPlaced: {
      type: 'boolean'
    },
    accumulatedPieces: {
      type: 'number'
    },
    accumulatedWeight: {
      type: 'number'
    },
    isAccepted: {
      type: 'boolean',
      defaultsTo: false
    },
    appliedRate: {
      type: 'number'
    },
    markupValue: {
      type: 'number'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    pickupState: {
      model: 'dropdownMapper'
    },
    dropoffState: {
      model: 'dropdownMapper'
    },
    pickupLocation: {
      model: 'locations'
    },
    dropoffLocation: {
      model: 'locations'
    },
    customer: {
      model: 'tradingPartners'
    },
    vendor: {
      model: 'tradingPartners'
    },
    rate: {
      model: 'rates'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    shipmentTracking: {
      collection: 'shipmentTracking',
      via: 'order'
    },
    freights: {
      collection: 'freights',
      via: 'order'
    },
    invoices: {
      collection: 'invoices',
      via: 'order'
    }
  },

  beforeCreate: (values, cb) => {
    UtilityService.orderCounter++;
    values.uid = UtilityService.orderCounter;
    values.orderNumber = 'SO' + UtilityService.orderCounter;
    cb();
  }

};
