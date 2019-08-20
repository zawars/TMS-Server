/**
 * InvoicesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
var edi = require('edi-parser');

module.exports = {

  index: async (req, res) => {
    try {
      const invoices = await Invoices.find().populateAll().sort('createdAt DESC');
      res.ok(invoices);
    } catch (e) {
      res.badRequest(e);
    }
  },

  createInvoiceByEDI: async (req, res) => {
    try {
      let data = req.body;

      let ediData = [];

      edi().fromPath(data.path)          //  __dirname + '/edi.X12'
        .transform(function (data) {
          let obj = {};
          for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
              obj[data[i]] = data[i + 1];
            }
          }
          data = obj;
          return data;
        })
        .on('data', function (data, index) {
          ediData.push(data);
        })
        .on('end', async function (data, index) {
          let order = await Orders.findOne({ orderNumber: ediData[0].orderNo.toUpperCase() }).populateAll();

          let originalQuotationRateSheet = [
            {
              item: "Freight",
              amount: order.rate ? order.rate.minCharge ? order.rate.minCharge : 0 : 0,
              currency: "USD"
            }
          ];

          let carrierInvoice = [];

          for (let i = 1; i < ediData.length; i++) {
            carrierInvoice.push({
              item: Object.keys(ediData[i])[0],
              amount: ediData[i][Object.keys(ediData[i])[0]],
              currency: ediData[0].currency
            })
          }

          let invoice = await Invoices.create({
            invoiceDate: new Date().toISOString(),
            originalQuotationRateSheet: originalQuotationRateSheet,
            carrierInvoice: carrierInvoice,
            status: 'Pending',
            order: order.id,
            rate: order.rate ? order.rate.id ? order.rate.id : undefined : undefined,
            vendor: order.vendor ? order.vendor.id ? order.vendor.id : undefined : undefined,
            customer: order.customer ? order.customer.id ? order.customer.id : undefined : undefined,
          }).fetch();

          fs.unlink(data.path, function (err) {
            if (err) return console.log(err); // handle error as you wish
            res.ok({ message: 'Invoice Imported successfully.', invoice: invoice});
          });
        });
    } catch (e) {
      res.badRequest(e);
    }
  }

};

