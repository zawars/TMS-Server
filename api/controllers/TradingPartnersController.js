/**
 * TradingPartnersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const io = sails.io;

io.on('connection', socket => {

  socket.on('fetchTradingPartner', async data => {
    let partner = await TradingPartners.findOne({
      id: data.id
    }).populateAll();

    let thirdPartyLocations = [];
    partner.thirdPartyLocations.map(val => thirdPartyLocations.push(val.id));

    partner.thirdPartyLocations = await Locations.find({
      id: {
        in: thirdPartyLocations
      }
    }).populateAll();

    socket.emit('fetchTradingPartner', partner);
  });

  socket.on('tradingPartnerCount', async data => {
    let count = await TradingPartners.count();
    socket.emit('tradingPartnerCount', count);
  });

  socket.on('tradingPartnersIndex', async data => {
    let result = await TradingPartners.find().paginate(data.pageNumber, data.pageSize).populateAll();
    socket.emit('tradingPartnerIndex', result);
  });

  socket.on('searchTradingPartnerByType', async data => {
    if (data.type == 'Customer') {
      let result = await TradingPartners.find({
        isCustomer: true,
        or: [{
            name: {
              'startsWith': data.query
            },
          },
          {
            email: {
              'startsWith': data.query
            },
          },
          {
            number: {
              'startsWith': data.query
            },
          },
        ]
      }).limit(10).populateAll();

      socket.emit('searchTradingPartnerByType', result);

    } else if (data.type == 'Vendor') {
      let result = await TradingPartners.find({
        isVendor: true,
        or: [{
            name: {
              'startsWith': data.query
            },
          },
          {
            email: {
              'startsWith': data.query
            },
          },
          {
            number: {
              'startsWith': data.query
            },
          },
        ]
      }).limit(10).populateAll();

      socket.emit('searchTradingPartnerByType', result);
    }
  });

  socket.on('getTradingPartner', async data => {
    let result = await TradingPartners.findOne({
      id: data.id
    }).populateAll();

    socket.emit('getTradingPartner', result);
  });

  socket.on('getTradingPartnerAsVendor', async data => {
    let result = await TradingPartners.find({
      isVendor: true,
      customerBillingName: {
        'startsWith': data.query
      }
    }).limit(10).populateAll();

    socket.emit('getTradingPartnerAsVendor', result);
  });

  socket.on('getTradingPartnerAsCustomer', async data => {
    let result = await TradingPartners.find({
      isCustomer: true,
      customerBillingName: {
        'startsWith': data.query
      }
    }).limit(10).populateAll();

    socket.emit('getTradingPartnerAsCustomer', result);
  });

});

module.exports = {
  partnersByType: async (req, res) => {
    let partners = await TradingPartners.find({
      type: req.params.type
    }).populateAll();

    res.ok(partners);
  },

  index: async (req, res) => {
    let results = await TradingPartners.find().paginate(req.query.pageNumber, req.query.pageSize || 10).populateAll();
    res.ok(results);
  },

  show: async (req, res) => {
    let id = req.params.id;

    let partner = await TradingPartners.findOne({
      id
    }).populateAll();

    if (partner) {
      let customerLocations = [];
      partner.customerLocations.map(val => customerLocations.push(val.id));
      partner.customerLocations = await Locations.find({
        id: {
          in: customerLocations
        }
      }).populateAll();

      let vendorLocations = [];
      partner.vendorLocations.map(val => vendorLocations.push(val.id));
      partner.vendorLocations = await Locations.find({
        id: {
          in: vendorLocations
        }
      }).populateAll();

      let thirdPartyLocations = [];
      partner.thirdPartyLocations.map(val => thirdPartyLocations.push(val.id));
      partner.thirdPartyLocations = await Locations.find({
        id: {
          in: thirdPartyLocations
        }
      }).populateAll();

      // Products section
      let products = [];
      partner.products.map(val => products.push(val.id));
      partner.products = await Products.find({
        id: {
          in: products
        }
      }).populateAll();
    }

    res.ok(partner);
  },

  create: async (req, res) => {
    try {
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
      if (data.isCustomer == true) {
        data.customerBillingPostalCode = data.customerBillingPostalCode.id != undefined ? data.customerBillingPostalCode.id : data.customerBillingPostalCode;
        data.customerBillingCity = data.customerBillingCity.id != undefined ? data.customerBillingCity.id : data.customerBillingCity;
        data.customerBillingState = data.customerBillingState.id != undefined ? data.customerBillingState.id : data.customerBillingState;
        data.customerBillingCountry = data.customerBillingCountry.id != undefined ? data.customerBillingCountry.id : data.customerBillingCountry;
      }
      // Vendor
      if (data.isVendor == true) {
        data.vendorBillingPostalCode = data.vendorBillingPostalCode.id != undefined ? data.vendorBillingPostalCode.id : data.vendorBillingPostalCode;
        data.vendorBillingCity = data.vendorBillingCity.id != undefined ? data.vendorBillingCity.id : data.vendorBillingCity;
        data.vendorBillingState = data.vendorBillingState.id != undefined ? data.vendorBillingState.id : data.vendorBillingState;
        data.vendorBillingCountry = data.vendorBillingCountry.id != undefined ? data.vendorBillingCountry.id : data.vendorBillingCountry;
      }
      // Third Party
      if (data.isThirdParty == true) {
        data.thirdPartyBillingPostalCode = data.thirdPartyBillingPostalCode.id != undefined ? data.thirdPartyBillingPostalCode.id : data.thirdPartyBillingPostalCode;
        data.thirdPartyBillingCity = data.thirdPartyBillingCity.id != undefined ? data.thirdPartyBillingCity.id : data.thirdPartyBillingCity;
        data.thirdPartyBillingState = data.thirdPartyBillingState.id != undefined ? data.thirdPartyBillingState.id : data.thirdPartyBillingState;
        data.thirdPartyBillingCountry = data.thirdPartyBillingCountry.id != undefined ? data.thirdPartyBillingCountry.id : data.thirdPartyBillingCountry;
      }

      let partner = await TradingPartners.create(data).fetch();
      customerLocations.forEach(location => {
        location.customer = partner.id;
        location.type = location.type.id;
        location.state = location.state.id;
        location.country = location.country.id;
        location.city = location.city.id;
        location.postalCode = location.postalCode.id;
      });
      vendorLocations.forEach(location => {
        location.vendor = partner.id;
        location.type = location.type.id;
        location.state = location.state.id;
        location.country = location.country.id;
        location.city = location.city.id;
        location.postalCode = location.postalCode.id;
      });
      thirdPartyLocations.forEach(location => {
        location.thirdParty = partner.id;
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
      usersList.forEach(val => val.tradingPartner = partner.id);
      await User.createEach(usersList);

      res.ok(partner);

    } catch (error) {
      res.badRequest({
        error
      })
    }
  },

  update: async (req, res) => {
    try {
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

      // Trading Partner
      data.postalCode = data.postalCode.id;
      data.city = data.city.id;
      data.state = data.state.id != undefined ? data.state.id : data.state;
      data.country = data.country.id != undefined ? data.country.id : data.country;
      // Customer
      if (data.isCustomer == true) {
        data.customerBillingPostalCode = data.customerBillingPostalCode.id != undefined ? data.customerBillingPostalCode.id : data.customerBillingPostalCode;
        data.customerBillingCity = data.customerBillingCity.id != undefined ? data.customerBillingCity.id : data.customerBillingCity;
        data.customerBillingState = data.customerBillingState.id != undefined ? data.customerBillingState.id : data.customerBillingState;
        data.customerBillingCountry = data.customerBillingCountry.id != undefined ? data.customerBillingCountry.id : data.customerBillingCountry;
      }
      // Vendor
      if (data.isVendor == true) {
        data.vendorBillingPostalCode = data.vendorBillingPostalCode.id != undefined ? data.vendorBillingPostalCode.id : data.vendorBillingPostalCode;
        data.vendorBillingCity = data.vendorBillingCity.id != undefined ? data.vendorBillingCity.id : data.vendorBillingCity;
        data.vendorBillingState = data.vendorBillingState.id != undefined ? data.vendorBillingState.id : data.vendorBillingState;
        data.vendorBillingCountry = data.vendorBillingCountry.id != undefined ? data.vendorBillingCountry.id : data.vendorBillingCountry;
      }
      // Third Party
      if (data.isThirdParty) {
        data.thirdPartyBillingPostalCode = data.thirdPartyBillingPostalCode.id != undefined ? data.thirdPartyBillingPostalCode.id : data.thirdPartyBillingPostalCode;
        data.thirdPartyBillingCity = data.thirdPartyBillingCity.id != undefined ? data.thirdPartyBillingCity.id : data.thirdPartyBillingCity;
        data.thirdPartyBillingState = data.thirdPartyBillingState.id != undefined ? data.thirdPartyBillingState.id : data.thirdPartyBillingState;
        data.thirdPartyBillingCountry = data.thirdPartyBillingCountry.id != undefined ? data.thirdPartyBillingCountry.id : data.thirdPartyBillingCountry;
      }

      let services = [];
      data.customerServices.forEach(service => {
        if (service.id != undefined) {
          services.push(service.id);
        } else {
          services.push(service);
        }
      });
      data.customerServices = services;

      let vendorServices = [];
      data.vendorServices.forEach(service => {
        if (service.id != undefined) {
          vendorServices.push(service.id);
        } else {
          vendorServices.push(service);
        }
      });
      data.vendorServices = vendorServices;

      let TPservices = [];
      data.thirdPartyServices.forEach(service => {
        if (service.id != undefined) {
          TPservices.push(service.id);
        } else {
          TPservices.push(service);
        }
      });
      data.thirdPartyServices = TPservices;

      // Bill-To section
      data.thirdPartyBillTo = [];
      if (thirdPartyBillToList != undefined) {
        thirdPartyBillToList.forEach(val => {
          data.thirdPartyBillTo.push(val.id);
        });
      }

      let partner = await TradingPartners.update({
        id: req.params.id
      }).set(data).fetch();
      partner = partner[0];

      let toBeCreatedLocations = [];
      customerLocations.forEach(location => {
        if (location.id == undefined) {
          location.customer = partner.id;
          location.type = location.type.id;
          location.state = location.state.id;
          location.country = location.country.id;
          location.city = location.city.id;
          location.postalCode = location.postalCode.id;
          toBeCreatedLocations.push(location);
        }
      });
      vendorLocations.forEach(location => {
        if (location.id == undefined) {
          location.vendor = partner.id;
          location.type = location.type.id;
          location.state = location.state.id;
          location.country = location.country.id;
          location.city = location.city.id;
          location.postalCode = location.postalCode.id;
          toBeCreatedLocations.push(location);
        }
      });
      thirdPartyLocations.forEach(location => {
        if (location.id == undefined) {
          location.thirdParty = partner.id;
          location.type = location.type.id;
          location.state = location.state.id;
          location.country = location.country.id;
          location.city = location.city.id;
          location.postalCode = location.postalCode.id;
          toBeCreatedLocations.push(location);
        }
      });

      if (toBeCreatedLocations.length > 0) {
        await Locations.createEach(toBeCreatedLocations).fetch();
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
          await Products.createEach(toBeCreatedProducts).fetch();
        }
      }

      // Users section
      if (usersList) {
        let toBeCreatedUsers = [];
        usersList.forEach(user => {
          if (user.id == undefined) {
            user.tradingPartner = partner.id;
            toBeCreatedUsers.push(user);
          }
        });

        if (toBeCreatedUsers.length > 0) {
          await User.createEach(toBeCreatedUsers).fetch();
        }
      }

      res.ok(partner);

    } catch (error) {
      res.badRequest({
        error
      });
    }
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
