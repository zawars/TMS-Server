/**
 * DropdownMapperChildController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  searchCity: async (req, res) => {
    try {
      let query = req.params.query;
      let result;
      let dropDown = await Dropdown.findOne({
        field: 'Cities'
      });
      let val = +query;

      if (Number.isNaN(val)) {
        result = await DropdownMapper.find({
          dropdown: dropDown.id,
          name: {
            'contains': query
          }
        }).populateAll().limit(10);
      } else {
        result = await DropdownMapperChild.find({
          name: {
            'contains': query
          }
        }).populateAll();
      }

      res.ok(result);
    } catch (e) {
      res.ok(e);
    }
  },

  searchPostalCode: async (req, res) => {
    try {
      let query = req.params.query;

      const postalCodes = await DropdownMapperChild.find({
        name: {
          'contains': query
        }
      }).populateAll();

      res.ok(postalCodes);
    } catch (e) {
      res.ok(e);
    }
  },

};
