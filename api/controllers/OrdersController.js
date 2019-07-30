/**
 * OrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getOrdersByStatus: async (req, res) => {
    try {
      let query = req.params.query;

      if (query == 'saved') {
        const orders = await Orders.find({
          isPlaced: false
        }).populateAll();
        res.ok(orders);
      } else if (query == 'placed') {
        const orders = await Orders.find({
          isPlaced: true
        }).populateAll();
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
