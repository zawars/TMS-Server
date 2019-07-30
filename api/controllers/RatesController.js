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

      let contractsList = await Rates.find({ client: ratePrams.clientId }).populateAll();

      const rates = await Rates.find({
        or: [{
          and: [{
            originCity: {
              'contains': ratePrams.originCity
            }
          },
          {
            destinationCity: {
              'contains': ratePrams.destinationCity
            }
          }
          ]
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
        }],
        and: [{
          originCountry: {
            'contains': ratePrams.originCountry
          }
        },
        {
          destinationCountry: {
            'contains': ratePrams.destinationCountry
          }
        }
        ],
        weightBreaks: ratePrams.weight
      }).populateAll();

      let filterRates = [];

      rates.forEach(rate => {
        if (contractsList.find(val => val.id == rate.rateSheet.contract)) {
          filterRates.push(rate);
        }
      });

      if (filterRates.length > 0) {
        rates = filterRates;
      }

      let contractIds = [];

      rates.forEach(rate => {
        contractIds.push(rate.rateSheet.contract);
      });

      const contracts = await Contracts.find({
        id: {
          in: contractIds
        }
      }).populateAll();

      let vendorsList = [];
      let vendorsIds = [];

      rates.forEach(rate => {
        contracts.forEach(contract => {
          let findContract = contract.rateSheets.find(val => val.id == rate.rateSheet.id);
          if (findContract) {
            vendorsIds.push(contract.vendor.id);
            vendorsList.push({
              vendor: contract.vendor,
              rateSheet: rate.rateSheet.id
            });
          }
        });
      });

      const vendors = await TradingPartners.find({
        id: {
          in: vendorsIds
        }
      }).populateAll();

      let rateSheetVendor = [];

      vendorsList.forEach(vendorObj => {
        if (vendors.find(val => val.id == vendorObj.vendor.id)) {
          vendorObj.vendor = vendors.find(val => val.id == vendorObj.vendor.id);
          rateSheetVendor.push({
            vendor: vendorObj.vendor,
            rateSheet: vendorObj.rateSheet
          });
        }
      });

      res.ok({
        rates,
        rateSheetVendor
      });
    } catch (e) {
      res.ok(e);
    }
  },

};
