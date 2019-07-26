/**
 * RateSheetsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  getBatchRateSheets: async (req, res) => {
    try {
      let rateSheetsIds = req.body.rateSheetsIds;

      const rateSheets = await RateSheets.find({
        id: {
          in: rateSheetsIds
        }
      }).populateAll();

      res.ok(rateSheets);
    } catch (e) {
      res.badRequest(e);
    }
  },

  createBatchRateSheets: async (req, res) => {
    try {
      let rateSheetList = req.body.contractRates;

      let ratesCollection = [];
      rateSheetList.map(rateSheet => {
        ratesCollection.push(rateSheet.rates);
        delete(rateSheet.rates);
      });

      let rateSheets = await RateSheets.createEach(rateSheetList).fetch();

      ratesCollection.map(async (rateList, idx) => {
        rateList.map(rate => rate.rateSheet = rateSheets[idx].id);
        rateSheets[idx].rates = await Rates.createEach(rateList).fetch();
      });
      res.ok(rateSheets);
    } catch (e) {
      res.badRequest(e);
    }
  },

  getRateSheetsBycontract: async (req, res) => {
    try {
      let results = await RateSheets.find({
        contract: req.params.id
      }).populateAll();
      res.ok(results);
    } catch (error) {
      res.ok(error);
    }
  },

};
