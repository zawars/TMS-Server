/**
 * AreaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async (req, res) => {
    try {
      let data = req.body;
      data.postalCodes.forEach((val, idx) => {
        data.postalCodes[idx] = val.id
      });

      let area = await Area.create(data).fetch();
      res.ok(area);
    } catch (error) {
      res.ok({
        error
      });
    }
  }

};

