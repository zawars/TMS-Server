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

    customerBillingName: {
      type: 'string',
    },
    customerBillingStreet: {
      type: 'string',
    },
    customerBillingContactName: {
      type: 'string',
    },
    customerBillingContactEmail: {
      type: 'string',
    },
    customerPaymentTerms: {
      type: 'string',
    },
    customerConfirmationEmail: {
      type: 'string',
    },
    creditLimit: {
      type: 'number',
    },

    vendorBillingName: {
      type: 'string',
    },
    vendorBillingStreet: {
      type: 'string',
    },
    vendorBillingContactName: {
      type: 'string',
    },
    vendorBillingContactEmail: {
      type: 'string',
    },
    vendorPaymentTerms: {
      type: 'string',
    },
    vendorConfirmationEmail: {
      type: 'string',
    },

    thirdPartyBillingName: {
      type: 'string',
    },
    thirdPartyBillingStreet: {
      type: 'string',
    },
    thirdPartyBillingContactName: {
      type: 'string',
    },
    thirdPartyBillingContactEmail: {
      type: 'string',
    },
    thirdPartyPaymentTerms: {
      type: 'string',
    },
    thirdPartyNotificationEmail: {
      type: 'string',
    },

    isCustomer: {
      type: 'boolean',
      defaultsTo: false
    },
    isVendor: {
      type: 'boolean',
      defaultsTo: false
    },
    isThirdParty: {
      type: 'boolean',
      defaultsTo: false
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
    state: {
      model: 'states',
    },
    country: {
      model: 'dropdownMapper',
    },
    organisation: {
      model: 'organisation'
    },
    status: {
      model: 'dropdownMapper',
    },

    customerBillingCity: {
      model: 'dropdownMapper',
    },
    customerBillingPostalCode: {
      model: 'dropdownMapperChild',
    },
    customerBillingState: {
      model: 'states',
    },
    customerBillingCountry: {
      model: 'dropdownMapper',
    },
    customerFreightTerms: {
      model: 'dropdownMapper',
    },
    customerCurrency: {
      model: 'dropdownMapper',
    },
    customerServices: {
      collection: 'dropdownMapper',
    },
    customerLocations: {
      collection: 'locations',
      via: 'customer'
    },
    products: {
      collection: 'products',
      via: 'tradingPartner'
    },

    vendorBillingCity: {
      model: 'dropdownMapper',
    },
    vendorBillingPostalCode: {
      model: 'dropdownMapperChild',
    },
    vendorBillingState: {
      model: 'states',
    },
    vendorBillingCountry: {
      model: 'dropdownMapper',
    },
    vendorFreightTerms: {
      model: 'dropdownMapper',
    },
    vendorCurrency: {
      model: 'dropdownMapper',
    },
    vendorServices: {
      collection: 'dropdownMapper',
    },
    vendorLocations: {
      collection: 'locations',
      via: 'vendor'
    },

    thirdPartyBillingCity: {
      model: 'dropdownMapper',
    },
    thirdPartyBillingPostalCode: {
      model: 'dropdownMapperChild',
    },
    thirdPartyBillingState: {
      model: 'states',
    },
    thirdPartyBillingCountry: {
      model: 'dropdownMapper',
    },
    thirdPartyLocations: {
      collection: 'locations',
      via: 'thirdParty'
    },
    thirdPartyServices: {
      collection: 'dropdownMapper',
    },
    thirdPartyBillTo: {
      collection: 'tradingPartners'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    contracts: {
      collection: 'contracts',
      via: 'vendor'
    },
    users: {
      collection: 'user',
      via: 'tradingPartner'
    },
  },

  beforeCreate: (values, cb) => {
    UtilityService.tradingPartnerCounter++;
    values.uid = UtilityService.tradingPartnerCounter;
    cb();
  }

};
