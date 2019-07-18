/**
 * TradingPartners.js
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
      type: 'string',
    },
    number: {
      type: 'string',
    },
    street: {
      type: 'string',
    },
    postalCode: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    contactName: {
      type: 'string',
    },
    contactEmail: {
      type: 'string',
    },
    contactNumber: {
      type: 'string',
    },
    billingName: {
      type: 'string',
    },
    billingStreet: {
      type: 'string',
    },
    billingCity: {
      type: 'string',
    },
    billingZipCode: {
      type: 'string',
    },
    billingContactName: {
      type: 'string',
    },
    billingContactEmail: {
      type: 'string',
    },
    paymentTerms: {
      type: 'string',
    },
    consigneeName: {
      type: 'string',
    },
    consigneeLocationType: {
      type: 'string',
    },
    consigneeStreet: {
      type: 'string',
    },
    consigneeCity: {
      type: 'string',
    },
    consigneePostalCode: {
      type: 'string',
    },
    consigneeCountry: {
      type: 'string',
    },
    productName: {
      type: 'string',
    },
    nmfc: {
      type: 'string',
    },
    handlingUnit: {
      type: 'string',
    },
    huType: {
      type: 'string',
    },
    pickupName: {
      type: 'string',
    },
    pickupLocationType: {
      type: 'string',
    },
    pickupStreet: {
      type: 'string',
    },
    pickupCity: {
      type: 'string',
    },
    pickupPostalCode: {
      type: 'string',
    },
    pickupCountry: {
      type: 'string',
    },
    confirmationEmail: {
      type: 'string',
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    logo: {
      model: 'attachments',
    },
    type: {
      model: 'dropdownMapper'
    },
    freightTerms: {
      model: 'dropdownMapper',
    },
    status: {
      model: 'dropdownMapper',
    },
    billingState: {
      model: 'dropdownMapper',
    },
    billingCountry: {
      model: 'dropdownMapper',
    },
    currency: {
      model: 'dropdownMapper',
    },
    services: {
      model: 'dropdownMapper',
    },
    class: {
      type: 'dropdownMapper',
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    contracts: {
      collection: 'contracts',
      via: 'vendor'
    }
  },

};
