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
      let accessorialList = req.body.accessorials;

      let rateSheets;
      let accessorials;

      if (rateSheetList.length > 0) {
        let ratesCollection = [];
        rateSheetList.map(rateSheet => {
          ratesCollection.push(rateSheet.rates);
          delete (rateSheet.rates);
        });

        rateSheets = await RateSheets.createEach(rateSheetList).fetch();

        ratesCollection.map(async (rateList, idx) => {
          rateList.map(rate => rate.rateSheet = rateSheets[idx].id);
          rateSheets[idx].rates = await Rates.createEach(rateList).fetch();
        });
      }

      if(accessorialList.length > 0) {
        accessorials = await Accessorials.createEach(accessorialList).fetch();
      }
      
      res.ok({rateSheets: rateSheets, accessorials: accessorials});
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
