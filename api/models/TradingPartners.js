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
    postalCode: {
      model: 'dropdownMapperChild',
    },
    city: {
      model: 'dropdownMapper',  
    },
    billingCity: {
      model: 'dropdownMapper',
    },
    billingZipCode: {
      model: 'dropdownMapperChild',
    },
    partnerType: {
      model: 'dropdownMapper'
    },
    state: {
      model: 'states',
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
      model: 'states',
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
