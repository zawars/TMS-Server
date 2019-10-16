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
  },

  index: async (req, res) => {
    let results = await Area.find().populateAll();

    results.forEach(async (result, iteratorIdx) => {
      let ids = [];
      result.postalCodes.forEach(val => {
        ids.push(val.id);
      });

      let data = await DropdownMapperChild.find({
        id: {
          in: ids
        }
      }).populateAll();


      result.postalCodes = data;
      result.postalCodes.forEach((val, idx) => {
        result.postalCodes[idx].city = val.dropdownMapper.name;
      });

      if (iteratorIdx == results.length - 1) {
        res.ok(results);
      }
    });
  },


  show: async (req, res) => {
    let result = await Area.findOne({ id: req.params.id }).populateAll();

    let ids = [];
    result.postalCodes.forEach(val => {
      ids.push(val.id);
    });

    let data = await DropdownMapperChild.find({
      id: {
        in: ids
      }
    }).populateAll();


    result.postalCodes = data;
    result.postalCodes.forEach((val, idx) => {
      result.postalCodes[idx].city = val.dropdownMapper.name;
    });

    res.ok(result);
  },

};

