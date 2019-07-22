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

  create: async (req, res) => {
    let data = req.body;
    let locations = data.locations;
    delete(data.locations);

    let partner = await TradingPartners.create(data).fetch();
    locations.forEach(location => {
      location.tradingPartner = partner.id
    });

    let locationsList = await Locations.createEach(locations).fetch();
    partner.locations = locationsList;

    res.ok(locations);
  },

};
