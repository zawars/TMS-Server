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

  createQuoteBatchFreights: async (req, res) => {
    try {
      let quoteObj = req.body.quoteObj;

      let freightCollection = quoteObj.freights;
      delete(quoteObj.freights);

      let quote = await Quotes.create(quoteObj).fetch();

      freightCollection.map(freight => {
        freight.quote = quote.id;
      });

      let freights = await Freights.createEach(freightCollection).fetch();

      quote.freights = freights;

      res.ok(quote);
    } catch (e) {
      res.badRequest(e);
    }
  },

};

