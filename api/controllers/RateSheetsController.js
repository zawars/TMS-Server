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

      const rateSheets = await RateSheets.find({ id: { in: rateSheetsIds } }).populateAll;

      res.ok(rateSheets);
    } catch (e) {
      res.badRequest(e);
    }
  }

};

