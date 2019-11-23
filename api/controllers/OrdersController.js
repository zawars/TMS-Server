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
});

module.exports = {
  getOrderByCustomer: async (req, res) => {
    try {
      let id = req.params.id;
      let status = req.params.status;

      if (status == 'saved') {
        const orders = await Orders.find({
          customer: id,
          isPlaced: false
        }).populateAll().sort('createdAt DESC');
        res.ok(orders);
      } else if (status == 'placed') {
        const orders = await Orders.find({
          customer: id,
          isPlaced: true
        }).populateAll().sort('createdAt DESC');
        res.ok(orders);
      } else {
        res.ok([]);
      }
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
