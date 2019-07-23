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

  update: async (req, res) => {
    let data = req.body;
    let locations = data.locations;
    delete(data.locations);

    let partner = await TradingPartners.update({
      id: req.params.id
    }).set(data).fetch();
    partner = partner[0];

    let toBeCreatedLocations = [];
    locations.forEach(location => {
      if (location.id == undefined) {
        location.tradingPartner = partner.id;
        location.type = location.type.id;
        location.state = location.state.id;
        location.country = location.country.id;
        toBeCreatedLocations.push(location);
      }
    });

    if (toBeCreatedLocations.length > 0) {
      let locationsList = await Locations.createEach(toBeCreatedLocations).fetch();
      partner.locations = locationsList;
    }

    res.ok(locations);
  },
};
