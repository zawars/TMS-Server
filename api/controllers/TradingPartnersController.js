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
    }).populateAll();

    res.ok(partners);
  },

  show: async (req, res) => {
    let id = req.params.id;

    let partner = await TradingPartners.findOne({
      id
    }).populateAll();

    if(partner) {
      partner.locations = await Locations.find({
        tradingPartner: partner.id
      }).populateAll();
    }

    res.ok(partner);
  },

  index: async (req, res) => {
    let results = await TradingPartners.find().populateAll();
    res.ok(results);
  },

  create: async (req, res) => {
    let data = req.body;
    let locations = data.locations;
    let products = data.products;
    delete(data.locations);
    delete(data.products);
    data.postalCode = data.postalCode.id;
    data.city = data.city.id;
    data.billingCity = data.billingCity.id;
    data.billingZipCode = data.billingZipCode.id;

    let partner = await TradingPartners.create(data).fetch();
    locations.forEach(location => {
      location.tradingPartner = partner.id;
      location.type = location.type.id;
      location.state = location.state.id;
      location.country = location.country.id;
      location.city = location.city.id;
      location.postalCode = location.postalCode.id;
    });

    let locationsList = await Locations.createEach(locations).fetch();
    partner.locations = locationsList;

    // Check for products and create them if being sent by the user, in case of Customer.
    if (products) {
      products.forEach(product => {
        product.tradingPartner = partner.id;
        product.handlingUnit = product.handlingUnit.id;
        product.classType = product.classType.id;
      });

      let productsList = await Products.createEach(products).fetch();
      partner.products = productsList;
    }

    res.ok(partner);
  },

  update: async (req, res) => {
    let data = req.body;
    let locations = data.locations;
    let products = data.products;
    delete(data.locations);
    delete(data.products);

    data.postalCode = data.postalCode.id;
    data.city = data.city.id;
    data.billingCity = data.billingCity.id;
    data.billingZipCode = data.billingZipCode.id;

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
        location.city = location.city.id;
        location.postalCode = location.postalCode.id;
        toBeCreatedLocations.push(location);
      }
    });

    if (toBeCreatedLocations.length > 0) {
      let locationsList = await Locations.createEach(toBeCreatedLocations).fetch();
      partner.locations = locationsList;
    }

    // Products section
    if (products) {
      let toBeCreatedProducts = [];
      products.forEach(product => {
        if (product.id == undefined) {
          product.tradingPartner = partner.id;
          product.handlingUnit = product.handlingUnit.id;
          product.classType = product.classType.id;
          toBeCreatedProducts.push(product);
        }
      });

      if (toBeCreatedProducts.length > 0) {
        let productsList = await Products.createEach(toBeCreatedProducts).fetch();
        partner.products = productsList;
      }
    }

    res.ok(partner);
  },

  search: async (req, res) => {
    let query = req.params.query;
    let type = req.params.type;
    let partners = await TradingPartners.find({
      or: [{
          name: {
            'contains': query
          },
          type
        },
        {
          email: {
            'contains': query
          },
          type
        },
        {
          number: {
            'contains': query
          },
          type
        },
      ]
    }).populateAll();
    res.ok(partners);
  },

};
