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

      let dropDown = await Dropdown.findOne({ field: 'Cities' });

      const cities = await DropdownMapper.find({
        dropdown: dropDown.id,
        or: [{
          name: {
            'contains': query
          }
        }]
      }).populateAll();
      res.ok(cities);
    } catch (e) {
      res.ok(e);
    }
  },

};

