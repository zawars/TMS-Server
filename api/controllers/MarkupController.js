/**
 * MarkupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    let data = req.body;
    data.client = data.client.id;
    data.vendor = data.vendor.id;
    let rates = await Rates.find({
      rateSheet: data.rateSheet
    }).populateAll();

    rates.map(async rate => {
      let markup = rate.minCharge * data.defaultPercentage / 100;

      if (data.minAmount < markup) {
        rate.appliedMarkup = data.minAmount;
      } else if (markup < data.maxAmount) {
        rate.appliedMarkup = markup;
      } else if (data.maxAmount < markup) {
        rate.appliedMarkup = data.maxAmount;
      }

      await Rates.update({
        id: rate.id
      }).set({
        appliedMarkup: rate.appliedMarkup
      });
    });

    let markup = await Markup.create(data).fetch();
    res.ok(markup);
  },

};
