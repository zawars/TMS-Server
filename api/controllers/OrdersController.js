/**
 * OrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
        vendor: req.params.id
      });

      res.ok(orders);
    } catch (error) {
      res.ok({
        message: error
      });
    }
  },

};
