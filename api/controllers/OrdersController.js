/**
 * OrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const io = sails.io;

io.on('connection', socket => {

  socket.on('sendEmailForOrderPlaced', async data => {
    let users = await User.find({
      roles: {
        contains: 'Admin'
      }
    });
    data.email = [];
    users.map(user => data.email.push(user.email));

    EmailService.sendMail(data, (err) => {
      if (err) {
        socket.emit('orderPlaced', "Error Sending Email")
      } else {
        socket.emit('orderPlaced', {});
      }
    });
  });

  socket.on('pickupCount', async data => {
    let count = await Orders.count({
      orderType: 'Pickup',
      isPlaced: true
    });
    socket.emit('pickupCount', count);
  });

  socket.on('pickupIndex', async data => {
    let result = await Orders.find({
      orderType: 'Pickup',
      isPlaced: true
    }).paginate(data.pageNumber, data.pageSize).populateAll().sort('createdAt DESC');
    socket.emit('pickupIndex', result);
  });

  socket.on('pickupCountClient', async data => {
    let count = await Orders.count({
      tradingPartner: data.tradingPartner,
      orderType: data.orderType,
    });
    socket.emit('pickupCountClient', count);
  });

  socket.on('pickupIndexClient', async data => {
    let result = await Orders.find({
      tradingPartner: data.tradingPartner,
      orderType: data.orderType,
    }).paginate(data.pageNumber, data.pageSize).populateAll().sort('createdAt DESC');
    socket.emit('pickupIndexClient', result);
  });

  socket.on('vendorOrdersCountClient', async data => {
    let count = await Orders.count({
      vendor: data.vendor,
      isPlaced: true,
    });
    socket.emit('vendorOrdersCountClient', count);
  });

  socket.on('vendorOrdersIndexClient', async data => {
    let result = await Orders.find({
      vendor: data.vendor,
      isPlaced: true,
    }).paginate(data.pageNumber, data.pageSize).populateAll().sort('createdAt DESC');
    socket.emit('vendorOrdersIndexClient', result);
  });

  socket.on('customerOrdersCountClient', async data => {
    let count = await Orders.count({
      tradingPartner: data.tradingPartner,
      isPlaced: data.status == "saved" ? false : true
    });
    socket.emit('customerOrdersCountClient', count);
  });

  socket.on('customerOrdersIndexClient', async data => {
    let result = await Orders.find({
      tradingPartner: data.tradingPartner,
      isPlaced: data.status == "saved" ? false : true
    }).paginate(data.pageNumber, data.pageSize).populateAll().sort('createdAt DESC');
    socket.emit('customerOrdersIndexClient', result);
  });

});

module.exports = {
  getOrderByCustomer: async (req, res) => {
    try {
      let id = req.params.id;
      let status = req.params.status;

      const orders = await Orders.find({
        tradingPartner: id,
        isPlaced: status == "saved" ? false : true
      }).populateAll().sort('createdAt DESC');
      res.ok(orders);
    } catch (e) {
      res.badRequest(e);
    }
  },

  getVendorOrders: async (req, res) => {
    try {
      let orders = await Orders.find({
        vendor: req.params.id,
        isPlaced: true
      }).populateAll();

      res.ok(orders);
    } catch (error) {
      res.ok({
        message: error
      });
    }
  },

  createOrderBatchFreights: async (req, res) => {
    try {
      let orderObj = req.body.orderObj;

      let freightCollection = orderObj.freights;
      delete(orderObj.freights);

      let order = await Orders.create(orderObj).fetch();

      freightCollection.map(freight => {
        freight.order = order.id;
      });

      let freights = await Freights.createEach(freightCollection).fetch();

      order.freights = freights;

      res.ok(order);
    } catch (e) {
      res.badRequest(e);
    }
  },

  updateOrderBatchFreights: async (req, res) => {
    try {
      let orderObj = req.body.orderObj;

      let freightCollection = orderObj.freights;
      delete(orderObj.freights);

      let oldFreightsIds = [];
      let newFreights = [];
      let oldFreights = [];

      freightCollection.forEach(freight => {
        if (freight.id == undefined) {
          freight.order = req.params.id
          newFreights.push(freight);
        } else {
          oldFreightsIds.push(freight.id);
          oldFreights.push(freight);
        }
      });

      orderObj.freights = oldFreightsIds;

      let order = await Orders.update({
        id: req.params.id
      }).set(orderObj).fetch();


      let freights = await Freights.createEach(newFreights).fetch();

      oldFreights.forEach(async freigth => {
        let freight = await Freights.update({
          id: freigth.id
        }).set(freigth).fetch();
      });

      res.ok(order);
    } catch (e) {
      res.badRequest(e);
    }
  },

  getPlacedOrders: async (req, res) => {
    try {
      let orders = await Orders.find({
        isPlaced: true
      }).populateAll().sort('createdAt DESC').paginate({
        skip: req.query.skip,
        limit: req.query.limit
      });

      res.ok(orders);
    } catch (error) {
      res.ok({
        message: error
      });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      let orders = await Orders.find().populateAll().sort('createdAt DESC');

      res.ok(orders);
    } catch (error) {
      res.ok({
        message: error
      });
    }
  },

  getPickupRequestsForThirdParty: async (req, res) => {
    let data = req.body;

    let result = await Orders.find({
      tradingPartner: req.params.id,
      orderType: data.orderType
    }).paginate(req.query.pageNumber, req.query.pageSize).populateAll();

    res.ok(result);
  },

  getPickupRequests: async (req, res) => {
    let type = req.params.type;

    let result = await Orders.find({
      orderType: type,
      isPlaced: true
    }).paginate(req.query.pageNumber, req.query.pageSize).populateAll();

    res.ok(result);
  },

};
