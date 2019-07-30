/**
 * QuotesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getQuotesByCustomer: async (req, res) => {
    try {
      const quotes = await Quotes.find({ customer: req.params.id }).populateAll()
      .sort('createdAt DESC');

      res.ok(quotes);
    } catch (e) {
      res.badRequest(e);
    }
  },

};

