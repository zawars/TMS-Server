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
    uid: {
      type: 'number',
      unique: true,
    },
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
    creditLimit: {
      type: 'number',
    },
    confirmationEmail: {
      type: 'string',
    },
    type: {
      type: 'string',
      isIn: ['Vendor', 'Customer'],
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
    partnerType: {
      model: 'dropdownMapper'
    },
    state: {
      model: 'dropdownMapper',
    },
    country: {
      model: 'dropdownMapper',
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
      collection: 'dropdownMapper',
    },
    locations: {
      collection: 'locations',
      via: 'tradingPartner'
    },
    products: {
      collection: 'products',
      via: 'tradingPartner'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    contracts: {
      collection: 'contracts',
      via: 'vendor'
    }
  },

  beforeCreate: (values, cb) => {
    UtilityService.tradingPartnerCounter++;
    values.uid = UtilityService.tradingPartnerCounter;
    cb();
  }

};
