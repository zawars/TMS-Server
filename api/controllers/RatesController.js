/**
 * RatesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  searchRates: async (req, res) => {
    try {
      let ratePrams = req.body.searchObj;

      const rates = await Rates.find({
        or: [
          {
            and: [{
              originCity: {
                'contains': ratePrams.originCity
              }
            },
            {
              destinationCity: {
                'contains': ratePrams.destinationCity
              }
            }]
          }, {
            and: [{
              originPostalCode: {
                'contains': ratePrams.originPostalCode
              }
            },
            {
              destinationPostalCode: {
                'contains': ratePrams.destinationPostalCode
              }
            }
            ]
          }
        ],
        and: [{
          originCountry: {
            'contains': ratePrams.originCountry
          }
        },
        {
          destinationCountry: {
            'contains': ratePrams.destinationCountry
          }
        }],
        weightBreaks: ratePrams.weight
      }).populateAll();
      res.ok(rates);
    } catch (e) {
      res.ok(e);
    }
  },
  
};

