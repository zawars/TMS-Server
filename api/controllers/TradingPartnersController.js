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

    if (partner) {
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
    let customerLocations = data.customerLocations;
    let products = data.products;
    let vendorLocations = data.vendorLocations;
    let thirdPartyLocations = data.thirdPartyLocations;
    let thirdPartyBillToList = data.thirdPartyBillTo;
    let usersList = data.users;
    delete(data.customerLocations);
    delete(data.products);
    delete(data.vendorLocations);
    delete(data.thirdPartyLocations);
    delete(data.thirdPartyBillTo);
    delete(data.users);

    data.thirdPartyBillTo = [];
    thirdPartyBillToList.forEach(val => {
      data.thirdPartyBillTo.push(val.id);
    });

    // Trading Partner
    data.postalCode = data.postalCode.id;
    data.city = data.city.id;
    data.state = data.state.id != undefined ? data.state.id : data.state;
    data.country = data.country.id != undefined ? data.country.id : data.country;
    // Customer
    data.customerBillingPostalCode = data.customerBillingPostalCode.id != undefined ? data.customerBillingPostalCode.id : data.customerBillingPostalCode;
    data.customerBillingCity = data.customerBillingCity.id != undefined ? data.customerBillingCity.id : data.customerBillingCity;
    data.customerBillingState = data.customerBillingState.id != undefined ? data.customerBillingState.id : data.customerBillingState;
    data.customerBillingCountry = data.customerBillingCountry.id != undefined ? data.customerBillingCountry.id : data.customerBillingCountry;
    // Vendor
    data.vendorBillingPostalCode = data.vendorBillingPostalCode.id != undefined ? data.vendorBillingPostalCode.id : data.vendorBillingPostalCode;
    data.vendorBillingCity = data.vendorBillingCity.id != undefined ? data.vendorBillingCity.id : data.vendorBillingCity;
    data.vendorBillingState = data.vendorBillingState.id != undefined ? data.vendorBillingState.id : data.vendorBillingState;
    data.vendorBillingCountry = data.vendorBillingCountry.id != undefined ? data.vendorBillingCountry.id : data.vendorBillingCountry;
    // Third Party
    data.thirdPartyBillingPostalCode = data.thirdPartyBillingPostalCode.id != undefined ? data.thirdPartyBillingPostalCode.id : data.thirdPartyBillingPostalCode;
    data.thirdPartyBillingCity = data.thirdPartyBillingCity.id != undefined ? data.thirdPartyBillingCity.id : data.thirdPartyBillingCity;
    data.thirdPartyBillingState = data.thirdPartyBillingState.id != undefined ? data.thirdPartyBillingState.id : data.thirdPartyBillingState;
    data.thirdPartyBillingCountry = data.thirdPartyBillingCountry.id != undefined ? data.thirdPartyBillingCountry.id : data.thirdPartyBillingCountry;

    let partner = await TradingPartners.create(data).fetch();
    customerLocations.forEach(location => {
      location.tradingPartner = partner.id;
      location.type = location.type.id;
      location.state = location.state.id;
      location.country = location.country.id;
      location.city = location.city.id;
      location.postalCode = location.postalCode.id;
    });
    vendorLocations.forEach(location => {
      location.tradingPartner = partner.id;
      location.type = location.type.id;
      location.state = location.state.id;
      location.country = location.country.id;
      location.city = location.city.id;
      location.postalCode = location.postalCode.id;
    });
    thirdPartyLocations.forEach(location => {
      location.tradingPartner = partner.id;
      location.type = location.type.id;
      location.state = location.state.id;
      location.country = location.country.id;
      location.city = location.city.id;
      location.postalCode = location.postalCode.id;
    });

    let locations = [...customerLocations, ...vendorLocations, ...thirdPartyLocations];
    await Locations.createEach(locations).fetch();

    // Check for products and create them if being sent by the user, in case of Customer.
    if (products) {
      products.forEach(product => {
        product.tradingPartner = partner.id;
        product.handlingUnit = product.handlingUnit.id;
        product.classType = product.classType.id;
      });

      await Products.createEach(products).fetch();
    }

    // Users creation
    await User.createEach(usersList);

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
    // let type = req.params.type;
    let partners = await TradingPartners.find({
      or: [{
          name: {
            'startsWith': query
          },
        },
        {
          email: {
            'startsWith': query
          },
        },
        {
          number: {
            'startsWith': query
          },
        },
      ]
    }).populateAll();
    res.ok(partners);
  },

};
