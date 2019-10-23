/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  let cityDropdownId = '';
  if (await Dropdown.count() == 0) {
    let data = [{
        field: 'Country',
        values: []
      },
      {
        field: 'Product',
        values: []
      },
      {
        field: 'Handling Unit',
        values: [
          // {
          //   name: 'Software Development',
          //   position: 1,
          // },
        ]
      },
      {
        field: 'Weight Unit',
        values: []
      },
      {
        field: 'Length Unit',
        values: []
      },
      {
        field: 'Cube Unit',
        values: []
      },
      {
        field: 'Class',
        values: []
      },
      {
        field: 'Show Accessorials',
        values: []
      },
      {
        field: 'Cities',
        values: []
      },
      {
        field: 'Charge Type',
        values: []
      },
      {
        field: 'Postal Code',
        values: []
      },
      {
        field: 'Freight Terms',
        values: []
      },
      {
        field: 'Vendor Status',
        values: []
      },
      {
        field: 'Contract Status',
        values: []
      },
      {
        field: 'Currency',
        values: []
      },
      {
        field: 'Vendor Type',
        values: []
      },
      {
        field: 'Vendor Services',
        values: []
      },
      {
        field: 'User Type',
        values: []
      },
      {
        field: 'State',
        values: []
      },
      {
        field: 'Contract Type',
        values: []
      },
      {
        field: 'Rate Type',
        values: []
      },
      {
        field: 'Rate Calc UOM',
        values: []
      },
      {
        field: 'Rate Calc Type',
        values: []
      },
      {
        field: 'Rate Breaks',
        values: []
      },
      {
        field: 'Rate Break UOM',
        values: []
      },
      {
        field: 'Location Type',
        values: []
      },
      {
        field: 'Shipment Status',
        values: [{
            name: 'Waiting for pick up',
            position: 0,
          },
          {
            name: 'Picked up',
            position: 1,
          },
          {
            name: 'In Transit',
            position: 2,
          },
          {
            name: 'Delivered',
            position: 3,
          },
          {
            name: 'Proof of delivery',
            position: 4,
          },
        ]
      },
    ];

    data.forEach(async val => {
      let dropdown = await Dropdown.create({
        field: val.field
      }).fetch();

      if (dropdown.field == 'Cities') {
        cityDropdownId = dropdown.id;
      }

      val.values.forEach(obj => {
        dropdown: dropdown.id
      });

      await DropdownMapper.createEach(val.values);
    });
    console.log('Dropdown seeds planted. Ready to grow.');
  }

  if (await TradingPartners.count() > 0) {
    let tradingPartners = await TradingPartners.find();
    let uid = tradingPartners[tradingPartners.length - 1].uid;
    UtilityService.tradingPartnerCounter = uid;
  }

  if (await Contracts.count() > 0) {
    let contracts = await Contracts.find();
    let uid = contracts[contracts.length - 1].uid;
    UtilityService.contractCounter = uid;
  }

  if (await RateSheets.count() > 0) {
    let rateShheets = await RateSheets.find();
    let uid = rateShheets[rateShheets.length - 1].uid;
    UtilityService.rateSheetCounter = uid;
  }

  if (await Quotes.count() > 0) {
    let quotes = await Quotes.find();
    let uid = quotes[quotes.length - 1].uid;
    UtilityService.quoteCounter = uid;
  }

  if (await Orders.count() > 0) {
    let orders = await Orders.find();
    let uid = orders[orders.length - 1].uid;
    UtilityService.orderCounter = uid;
  }

  if (await User.count() == 0) {
    await User.create({
      username: 'admin',
      email: 'zawar.shahid@gmail.com',
      password: 'zawars',
      firstName: 'Zawar',
      lastName: 'Shahid',
      phone: '03244663758',
      isVerified: true,
      role: 'Admin'
    });
  }

  if (await Invoices.count() > 0) {
    let invoices = await Invoices.find();
    let uid = invoices[invoices.length - 1].uid;
    UtilityService.invoiceCounter = uid;
  }

  if (await Markup.count() > 0) {
    let markups = await Markup.find();
    let uid = markups[markups.length - 1].uid;
    UtilityService.markupCounter = uid;
  }

  if (await States.count() == 0) {
    let promise = new Promise(async (resolve, reject) => {
      let data = {
        path: process.cwd() + '/USA.xls',
        dropdown: cityDropdownId
      };
      const XLSX = require('xlsx');
      let workbook = XLSX.readFile(data.path);
      let results = XLSX.utils.sheet_to_json(workbook.Sheets['Part 1']);
      let part2 = XLSX.utils.sheet_to_json(workbook.Sheets['Part 2']);
      let statesSet = {};
      results.push(...part2);

      if (data.dropdown == '') {
        let dropdown = await Dropdown.findOne({
          field: 'Cities'
        });
        data.dropdown = dropdown.id;
      }

      results.map(row => {
        if (statesSet[row.State] == undefined) {
          statesSet[row.State] = {};
        }

        if (statesSet[row.State][row.City] != undefined) {
          statesSet[row.State][row.City].push({
            name: row.Zip
          });
        } else {
          statesSet[row.State][row.City] = [];
          statesSet[row.State][row.City].push({
            name: row.Zip
          });
        }
      });

      let stateKeys = Object.keys(statesSet).map(val => val = {
        name: val
      });
      let states = await States.createEach(stateKeys).fetch();
      let citiesKeys = [];

      states.forEach(state => {
        citiesKeys.push(...Object.keys(statesSet[state.name]).map(val => val = {
          name: val,
          dropdown: data.dropdown,
          state: state.id
        }));
      });

      let cities = await DropdownMapper.createEach(citiesKeys).fetch();
      let zipCodeskeys = [];

      states.forEach(state => {
        let stateCities = cities.filter(val => val.state == state.id);

        stateCities.forEach(city => {
          statesSet[state.name][city.name].map(val => val.dropdownMapper = city.id);
          zipCodeskeys.push(...statesSet[state.name][city.name]);
        });
      });

      await DropdownMapperChild.createEach(zipCodeskeys);
      resolve('Data Imported successfully.');
    });

    promise.then(result => console.log(result));
  }
};
