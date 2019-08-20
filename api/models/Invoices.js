/**
 * Invoices.js
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
    invoiceNo: {
      type: 'string',
      unique: true
    },
    invoiceDate: {
      type: 'string',
    },
    originalQuotationRateSheet: {
      type: 'json'
    },
    carrierInvoice: {
      type: 'json'
    },
    specificCarrierInvoice: {
      type: 'json'
    },
    originalQuotationMargin: {
      type: 'json'
    },
    customerBilling: {
      type: 'json'
    },
    status: {
      type: 'string'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    order: {
      model: 'orders'
    },
    rate: {
      model: 'rates'
    },
    vendor: {
      model: 'tradingPartners'
    },
    customer: {
      model: 'tradingPartners'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  beforeCreate: (values, cb) => {
    UtilityService.invoiceCounter++;
    values.uid = UtilityService.invoiceCounter;
    values.invoiceNo = 'INV' + UtilityService.invoiceCounter;
    cb();
  }
};

