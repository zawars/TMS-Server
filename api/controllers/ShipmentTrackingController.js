/**
 * ShipmentTrackingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    let data = req.body;

    let trackingObj = await ShipmentTracking.create(data).fetch();
    let order = await Orders.update({
      id: data.order
    }).set({
      status: data.status
    });

    res.ok(trackingObj);
  },

};
