/**
 * DropdownMapperChildController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const io = sails.io;

io.on('connection', socket => {
  socket.on('citiesAndPostalCodes', async data => {
    let result;
    let val = +data.query;
    let dropDown = await Dropdown.findOne({
      field: 'Cities'
    });

    if (Number.isNaN(val)) {
      result = await DropdownMapper.find({
        dropdown: dropDown.id,
        name: {
          'startsWith': data.query
        }
      }).populateAll().limit(10);
    } else {
      result = await DropdownMapperChild.find({
        name: {
          'startsWith': data.query
        }
      }).limit(10).populateAll();
    }

    socket.emit('citiesAndPostalCodes', result);
  });
});

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
            'startsWith': query
          }
        }).populateAll().limit(10);
      } else {
        result = await DropdownMapperChild.find({
          name: {
            'startsWith': query
          }
        }).limit(10).populateAll();
      }

      res.ok(result);
    } catch (e) {
      res.ok(e);
    }
  },

  searchCityByState: async (req, res) => {
    try {
      let city = req.body.city;
      let states = req.body.states;
      let dropDown = await Dropdown.findOne({
        field: 'Cities'
      });

      let result;
      if (states != undefined && states.length > 0) {
        result = await DropdownMapper.find({
          dropdown: dropDown.id,
          state: {
            in: states
          },
          name: {
            'startsWith': city
          }
        }).populateAll().limit(10);
      } else {
        result = await DropdownMapper.find({
          dropdown: dropDown.id,
          name: {
            'startsWith': city
          }
        }).populateAll().limit(10);
      }

      res.ok(result);
    } catch (e) {
      res.ok(e);
    }
  },

  searchPostalCodesByCity: async (req, res) => {
    let data = req.body;
    let result;

    if (data.cities != undefined && data.cities.length > 0) {
      result = await DropdownMapperChild.find({
        dropdownMapper: {
          in: data.cities
        },
        name: {
          'startsWith': data.postalCode
        }
      }).populateAll().limit(10);
    } else {
      result = await DropdownMapperChild.find({
        name: {
          'startsWith': data.postalCode
        }
      }).populateAll().limit(10);
    }

    res.ok(result);
  },

  getPostalCodesForArea: async (req, res) => {
    try {
      let data = req.body;
      let result = [];
      let cities;

      if (data.cities) { // Collect postalCodes for selected cities
        cities = await DropdownMapper.find({
          id: {
            in: data.cities
          },
        }).populateAll();
      } else if (data.states) {
        cities = await DropdownMapper.find({
          state: {
            in: data.states
          },
        }).populateAll();
      }

      cities.forEach(city => {
        city.values.map(val => val.city = city.name);
        result.push(...city.values);
      });

      res.ok(result);
    } catch (error) {
      res.ok(error);
    }
  },

};
