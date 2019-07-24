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

      let contractIds = [];

      rates.forEach(rate => {
        contractIds.push(rate.rateSheet.contract);
      });

      const contracts = await Contracts.find({ id: { in: contractIds } }).populateAll();

      let vendorsList = [];
      let vendorsIds = [];

      rates.forEach(rate => {
        contracts.forEach(contract => {
          let findContract = contract.rateSheets.find(val => val.id == rate.rateSheet.id);
          if (findContract) {  
            vendorsIds.push(contract.vendor.id);
            vendorsList.push({vendor: contract.vendor , rateSheet: rate.rateSheet.id});
          }
        });
      });

      const vendors = await TradingPartners.find({ id: { in: vendorsIds } }).populateAll();

      vendorsList.forEach(vendor => {
        vendor.vendor = vendors.find(val => val.id == vendor.id);
      });
      
      res.ok({rates, vendorsList});
    } catch (e) {
      res.ok(e);
    }
  },

};

