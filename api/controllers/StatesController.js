/**
 * StatesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  searchState: async (req, res) => {
    try {
      let query = req.params.query;
      let result = await States.find({
        name: {
          'contains': query
        }
      }).populateAll().limit(10);

      res.ok(result);
    } catch (e) {
      res.ok(e);
    }
  },

};
