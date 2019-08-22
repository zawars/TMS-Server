/**
 * RatesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  searchRates: async (req, res) => {
    try {
      let rateParams = req.body.searchObj;

      let contractsList = await Contracts.find({
        client: rateParams.clientId
      }).populateAll();

      let rates = await Rates.find({
        or: [{
          and: [{
              originCity: {
                'contains': rateParams.originCity
              }
            },
            {
              destinationCity: {
                'contains': rateParams.destinationCity
              }
            }
          ]
        }, {
          and: [{
              originPostalCode: {
                'contains': rateParams.originPostalCode
              }
            },
            {
              destinationPostalCode: {
                'contains': rateParams.destinationPostalCode
              }
            }
          ]
        }],
        and: [{
            originCountry: {
              'contains': rateParams.originCountry
            }
          },
          {
            destinationCountry: {
              'contains': rateParams.destinationCountry
            }
          }
        ],
      }).populateAll();

      // Search for customer specific contract rates
      let filterRates = [];
      rates.forEach(rate => {
        if (contractsList.find(val => val.id == rate.rateSheet.contract)) {
          filterRates.push(rate);
        }
      });

      if (filterRates.length > 0) {
        rates = filterRates;
      }

      let rateSheetsIds = [];
      rates.forEach(rate => {
        rateSheetsIds.push(rate.rateSheet.id);
      });

      const rateSheets = await RateSheets.find({
        id: {
          in: rateSheetsIds
        }
      }).populateAll();

      let vendorsList = [];
      let vendorsIds = [];
      let weight = rateParams.weight;

      rates.forEach(rate => {
        rateSheets.forEach(rateSheet => {
          // Calulate rate based on the weight breaks
          let weightBreak = rateSheet.contract.weightBreaks.split(',').map(val => val.trim());
          let weightIdx = 0;
          // Find the relative weight break and its index
          for (let i = 0; i < weightBreak.length; i++) {
            if (i == weightBreak.length - 1) {
              weightIdx = i;
              break;
            } else if (weight < weightBreak[i + 1]) {
              weightIdx = i;
              break;
            }
          }

          let rateUnit = rate.rateBreaks.split(',').map(val => val.trim())[weightIdx];
          let actualRate = rateUnit * weight;
          let appliedRate = 0;

          if (actualRate <= rate.minCharge) {
            appliedRate = rate.minCharge;
          } else if (actualRate >= rate.maxCharge) {
            appliedRate = rate.maxCharge;
          } else {
            appliedRate = actualRate;
          }

          let markupObj = rateSheet.markups[0];
          let markup = appliedRate * markupObj.defaultPercentage / 100;

          if (markup <= markupObj.minAmount) {
            markup = markupObj.minAmount;
          } else if (markup >= markupObj.maxAmount) {
            markup = markupObj.minAmount;
          }

          appliedRate += markup;
          rate.appliedRate = appliedRate;

          // Making a list of vendor Ids in order to fetch them again because of associated data
          vendorsIds.push(rateSheet.contract.vendor);
          vendorsList.push({
            vendor: rateSheet.contract.vendor,
            rateSheet: rateSheet.id
          });
        });
      });

      // Search in vendors again in order to populate associated data
      let rateSheetVendor = [];
      const vendors = await TradingPartners.find({
        id: {
          in: vendorsIds
        }
      }).populateAll();

      vendorsList.forEach(vendorObj => {
        if (vendors.find(val => val.id == vendorObj.vendor)) {
          vendorObj.vendor = vendors.find(val => val.id == vendorObj.vendor);
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
      res.ok({
        message: e
      });
    }
  },

};
