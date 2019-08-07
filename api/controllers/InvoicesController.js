/**
 * InvoicesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: async (req, res) => {
    try {
      const invoices = await Invoices.find().populateAll().sort('createdAt DESC');
      res.ok(invoices);
    } catch (e) {
      res.badRequest(e);
    }
  },

};

