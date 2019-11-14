/**
 * OrganisationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  search: async (req, res) => {
    try {

      let query = req.params.query;

      let result = await Organisation.find({
        name: {
          'startsWith': query
        }
      }).populateAll().limit(10);

      res.ok(result);
    } catch (error) {
      res.badRequest(error);
    }
  }

};
