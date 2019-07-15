/**
 * TradingPartnersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  partnersByType: async (req, res) => {
    let partners = await TradingPartners.find({
      type: req.params.type
    });

    res.ok(partners);
  },

};
