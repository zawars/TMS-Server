/**
 * ContractsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    let contract = req.body;
    let rateSheetList = contract.rateSheets;
    delete(contract.rateSheets);

    let contractObj = await Contracts.create(contract).fetch();

    let ratesCollection = [];
    rateSheetList.map(rateSheet => {
      rateSheet.contract = contractObj[0].id
      ratesCollection.push(rateSheet.rates);
      delete(rateSheet.rates);
    });

    let rateSheets = await RateSheets.createEach(rateSheetList).fetch();

    ratesCollection.map(async (rateList, idx) => {
      rateList.map(rate => rate.rateSheet = rateSheets[idx].id);
      rateSheets[idx].rates = await Rates.createEach(rateList).fetch();
    });

    contractObj.rateSheets = rateSheets;

    res.ok(contractObj);
  },

};
