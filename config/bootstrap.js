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

const XLSX = require('xlsx');

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
        values: [{
          name: 'US',
          position: 0
        }, ]
      },
      {
        field: 'Product',
        values: []
      },
      {
        field: 'Handling Unit',
        values: [{
            name: 'Letter',
            position: 0
          },
          {
            name: 'YourPackaging',
            position: 1
          },
          {
            name: 'Pallet',
            position: 2
          },
          {
            name: 'Loose',
            position: 3
          },
          {
            name: 'Drum',
            position: 4
          },
          {
            name: 'Crate',
            position: 5
          },
          {
            name: 'Pail',
            position: 6
          },
          {
            name: 'Roll',
            position: 7
          },
          {
            name: 'Carton',
            position: 8
          },
          {
            name: 'Tube',
            position: 9
          },
          {
            name: 'Box (fibreboard box)',
            position: 10
          },
          {
            name: 'Jerrican',
            position: 11
          },
          {
            name: 'Bag',
            position: 12
          },
          {
            name: 'Skid',
            position: 13
          },
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
        values: [{
            name: 'Collect',
            position: 0
          },
          {
            name: 'Prepaid',
            position: 1
          },
        ]
      },
      {
        field: 'Vendor Status',
        values: [{
            name: 'Active',
            position: 0
          },
          {
            name: 'Inactive',
            position: 1
          },
        ]
      },
      {
        field: 'Contract Status',
        values: []
      },
      {
        field: 'Currency',
        values: [{
          name: 'USD',
          position: 0
        }, ]
      },
      {
        field: 'Vendor Type',
        values: []
      },
      {
        field: 'Vendor Services',
        values: [{
            name: 'Delivery Surcharge - Cont. US',
            position: 0
          },
          {
            name: 'Extended Surcharge - Cont. US',
            position: 1
          },
          {
            name: 'Delivery Surcharge - AK',
            position: 2
          },
          {
            name: 'Delivery Surcharge - HI',
            position: 3
          },
          {
            name: 'Intra HI Surcharge',
            position: 4
          },
          {
            name: 'Residential Surcharge',
            position: 5
          },
          {
            name: 'Oversize',
            position: 6
          },
          {
            name: 'Additional Handling',
            position: 7
          },
          {
            name: 'Fuel Surcharge',
            position: 8
          },
          {
            name: 'Stop Off',
            position: 9
          },
          {
            name: 'Liftgate Delivery',
            position: 10
          },
          {
            name: 'Liftgate Pickup',
            position: 11
          },
          {
            name: 'Residential Delivery',
            position: 12
          },
          {
            name: 'Notification',
            position: 13
          },
          {
            name: 'Call for appointment',
            position: 14
          },
          {
            name: 'Change in Terms of Payment',
            position: 15
          },
          {
            name: 'Convention/Tradeshow Pickup',
            position: 16
          },
          {
            name: 'Convention/Tradeshow Delivery',
            position: 17
          },
          {
            name: 'Construction Site Pickup',
            position: 18
          },
          {
            name: 'Construction Site Delivery',
            position: 19
          },
          {
            name: 'Appointment',
            position: 20
          },
          {
            name: 'Canadian Surcharge',
            position: 21
          },
          {
            name: 'CFS Surcharge',
            position: 22
          },
          {
            name: 'Church Delivery',
            position: 23
          },
          {
            name: 'SChurch PickupqM',
            position: 24
          },
          {
            name: 'COD Fee',
            position: 25
          },
          {
            name: 'Corrected BOLs',
            position: 26
          },
          {
            name: 'Cross-Dock Handling',
            position: 27
          },
          {
            name: 'Cubic Density Surcharge',
            position: 28
          },
          {
            name: 'Delivery Area Surcharge',
            position: 29
          },
          {
            name: 'Delivery Area Surcharge (Extended)',
            position: 30
          },
          {
            name: 'International Delivery Area Surcharge',
            position: 31
          },
          {
            name: 'Deliver By Date or Date Range',
            position: 32
          },
          {
            name: 'Detention',
            position: 33
          },
          {
            name: 'Detention without power',
            position: 34
          },
          {
            name: '(SED) for each Puerto Rico or U.S. Virgin Island ',
            position: 35
          },
          {
            name: 'Documentation Charge',
            position: 36
          },
          {
            name: 'Excessive Length',
            position: 37
          },
          {
            name: 'Excess Liability',
            position: 38
          },
          {
            name: 'Floor Load',
            position: 39
          },
          {
            name: 'Fuel Surcharge Bad',
            position: 40
          },
          {
            name: 'Floor Unload',
            position: 41
          },
          {
            name: 'Geographic Linehaul Surcharge',
            position: 42
          },
          {
            name: 'Golf Course Delivery',
            position: 43
          },
          {
            name: 'Golf Course Pickup',
            position: 44
          },
          {
            name: 'Goverment Site Delivery',
            position: 45
          },
          {
            name: 'Goverment Site Pickup',
            position: 46
          },
          {
            name: 'Grocery Warehouse Delivery',
            position: 47
          },
          {
            name: 'Grocery Warehouse Pickup',
            position: 48
          },
          {
            name: 'Guaranteed Delivery',
            position: 49
          },
          {
            name: 'Guaranteed Delivery Before 3:30 PM',
            position: 50
          },
          {
            name: 'Guaranteed Delivery Before 9:00 AM',
            position: 51
          },
          {
            name: 'Guaranteed Delivery Before 10:00 am',
            position: 52
          },
          {
            name: 'Guaranteed Delivery Before Noon',
            position: 53
          },
          {
            name: 'Guaranteed Delivery - Single or multi-hour',
            position: 54
          },
          {
            name: 'Hazardous Material',
            position: 55
          },
          {
            name: 'High Cost Area',
            position: 56
          },
          {
            name: 'Holiday Pickup or Delivery',
            position: 57
          },
          {
            name: 'Hospital Delivery',
            position: 58
          },
          {
            name: 'Hospital Pickup',
            position: 59
          },
          {
            name: 'Homeland Security ',
            position: 60
          },
          {
            name: 'Hotel Delivery',
            position: 61
          },
          {
            name: 'Hotel Pickup',
            position: 62
          },
          {
            name: 'In Bond',
            position: 63
          },
          {
            name: 'Insurance',
            position: 64
          },
          {
            name: 'Inspection of Freight',
            position: 65
          },
          {
            name: 'Inside Delivery',
            position: 66
          },
          {
            name: 'Inside Pickup',
            position: 67
          },
          {
            name: 'Jail/Detention Center Delivery',
            position: 68
          },
          {
            name: 'Jail/Detention Center Pickup',
            position: 69
          },
          {
            name: 'Liftgate pickup with pallet jack',
            position: 70
          },
          {
            name: 'Liftgate delivery with pallet jack',
            position: 71
          },
          {
            name: 'Limited Access Delivery',
            position: 72
          },
          {
            name: 'Limited Access Pickup',
            position: 73
          },
          {
            name: 'Linehaul',
            position: 74
          },
          {
            name: 'Lumper',
            position: 75
          },
          {
            name: 'Mall Delivery',
            position: 76
          },
          {
            name: 'Marking or Tagging',
            position: 77
          },
          {
            name: 'Metropolitan Areas',
            position: 78
          },
          {
            name: 'Military Base or Facility Pickup',
            position: 79
          },
          {
            name: 'Military Base or Facility Delivery',
            position: 80
          },
          {
            name: 'Mine Delivery',
            position: 81
          },
          {
            name: 'Mine Pickup',
            position: 82
          },
          {
            name: 'Mini Storage Delivery',
            position: 83
          },
          {
            name: 'Mini Storage Pickup ',
            position: 84
          },
          {
            name: 'Minimum Charge Shipment',
            position: 85
          },
          {
            name: 'Next Flight Guaranteed',
            position: 86
          },
          {
            name: 'Overlength 14 ft',
            position: 87
          },
          {
            name: 'Overlength 20 ft',
            position: 88
          },
          {
            name: 'Overlength 24 ft',
            position: 89
          },
          {
            name: 'Overlength 12ft',
            position: 90
          },
          {
            name: 'Over Dimension',
            position: 91
          },
          {
            name: 'Packaging Cost',
            position: 92
          },
          {
            name: 'Perishable',
            position: 93
          },
          {
            name: 'Pallet Jack',
            position: 94
          },
          {
            name: 'Delivery at US Port',
            position: 95
          },
          {
            name: 'Pickup at US Port',
            position: 96
          },
          {
            name: 'Protect from Freezingx',
            position: 97
          },
          {
            name: 'Reconsignment',
            position: 98
          },
          {
            name: 'Redelivery',
            position: 99
          },
          {
            name: 'REMOTE SITE DELIVERY',
            position: 100
          },
          {
            name: 'REMOTE SITE PICKUP',
            position: 101
          },
          {
            name: 'Residential Pickup',
            position: 102
          },
          {
            name: 'Returned Shipment Documentation',
            position: 103
          },
          {
            name: 'Rural Areas',
            position: 104
          },
          {
            name: 'Saturday Pickup/Delivery',
            position: 105
          },
          {
            name: 'School / University Delivery',
            position: 106
          },
          {
            name: 'School / University Pickup',
            position: 107
          },
          {
            name: 'Security Inspection',
            position: 108
          },
          {
            name: 'Second Man',
            position: 109
          },
          {
            name: 'Security',
            position: 110
          },
          {
            name: 'Sort Segregate',
            position: 111
          },
          {
            name: 'Single Shipment',
            position: 112
          },
          {
            name: 'SAT/SUN Pickup or Delivery',
            position: 113
          },
          {
            name: 'Self Storage Unit Delivery',
            position: 114
          },
          {
            name: 'Storage',
            position: 115
          },
          {
            name: 'Tarping Fee',
            position: 116
          },
          {
            name: 'Tolls',
            position: 117
          },
          {
            name: 'TWIC Delivery',
            position: 118
          },
          {
            name: 'TWIC Pickup',
            position: 119
          },
          {
            name: 'Unloading',
            position: 120
          },
          {
            name: 'Utility Site Delivery',
            position: 121
          },
          {
            name: 'Utility Site Pickups',
            position: 122
          },
          {
            name: 'Walmart Delivery',
            position: 123
          },
          {
            name: 'White Glove Service',
            position: 124
          },
          {
            name: 'Weight & Inspection',
            position: 125
          },
          {
            name: 'Airport Delivery',
            position: 126
          },
          {
            name: 'Airport Pickup',
            position: 127
          },
          {
            name: 'Airport Airline Surcharge',
            position: 128
          },
          {
            name: 'Airport Transfer',
            position: 129
          },
          {
            name: 'Arbitrary Charge',
            position: 130
          },
          {
            name: 'Audit Fee',
            position: 131
          },
          {
            name: 'Before or After Hours',
            position: 132
          },
          {
            name: 'Blind Shipment Fee',
            position: 133
          },
          {
            name: 'Canadian Surcharge AB,BC',
            position: 134
          },
          {
            name: 'Capacity Load',
            position: 135
          },
          {
            name: 'Carbon Black',
            position: 136
          },
          {
            name: 'Carbon Tax',
            position: 137
          },
          {
            name: 'Country Club Delivery',
            position: 138
          },
          {
            name: 'Country Club Pickup',
            position: 139
          },
          {
            name: 'Overlength 28 feet',
            position: 140
          },
          {
            name: 'Resort Pickup/Delivery',
            position: 141
          },
          {
            name: 'Restaurant Delivery',
            position: 142
          },
          {
            name: 'Unknown Accessorial',
            position: 143
          },
          {
            name: 'California Compliance',
            position: 144
          },
          {
            name: 'Ground Delivery Service',
            position: 145
          },
          {
            name: 'Inside Pickup',
            position: 146
          },
          {
            name: 'Inside Delivery',
            position: 147
          },
          {
            name: 'Limited Access Delivery',
            position: 148
          },
          {
            name: 'IHT - Tolls',
            position: 149
          },
          {
            name: 'Country Club Delivery',
            position: 150
          },
          {
            name: 'Country Club Pick-up',
            position: 151
          },
          {
            name: `Overlength 16'`,
            position: 152
          },
          {
            name: `Overlength 8'`,
            position: 153
          },
          {
            name: `Overlength 16'`,
            position: 154
          },
          {
            name: 'Overlength 11 Feet',
            position: 155
          },
          {
            name: 'Overlength 15ft-19ft',
            position: 156
          },
          {
            name: 'Overlength 19.1ft to 29ft',
            position: 157
          },
          {
            name: 'Overlength 29.1ft & Over',
            position: 158
          },
          {
            name: 'Chassis Rental',
            position: 159
          },
          {
            name: 'Chassis Split',
            position: 160
          },
          {
            name: 'Prepull',
            position: 161
          },
          {
            name: 'Reefer',
            position: 162
          },
          {
            name: 'Triaxle',
            position: 163
          },
          {
            name: 'Special Equipment',
            position: 164
          },
          {
            name: 'Overlength 19.1 ft to 26ft',
            position: 165
          },
          {
            name: 'Overlength 19.1ft & 26ft',
            position: 166
          },
        ]
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
        values: [{
            name: 'Blanket Cost',
            position: 0
          },
          {
            name: 'Client Cost',
            position: 1
          },
          {
            name: 'Blanket Billing',
            position: 2
          },
          {
            name: 'Client Billing',
            position: 3
          },
        ]
      },
      {
        field: 'Rate Type',
        values: [{
            name: 'Area',
            position: 0
          },
          {
            name: 'Destiny',
            position: 1
          },
          {
            name: 'Flat Rate',
            position: 2
          },
          {
            name: 'Pieces',
            position: 3
          },
          {
            name: 'Weight',
            position: 4
          },
          {
            name: 'Volume',
            position: 5
          },
          {
            name: 'Per Pallet / Handling Unit',
            position: 6
          },
        ]
      },
      {
        field: 'Rate Calc UOM',
        values: [{
            name: 'SqFt',
            position: 0
          },
          {
            name: 'SqM',
            position: 1
          },
        ]
      },
      {
        field: 'Rate Calc Type',
        values: [{
            name: 'Cumulative Unit Rate',
            position: 0
          },
          {
            name: 'Total Rate',
            position: 1
          },
          {
            name: 'Unit Rate',
            position: 2
          },
        ]
      },
      {
        field: 'Rate Breaks',
        values: []
      },
      {
        field: 'Rate Break UOM',
        values: [{
            name: 'Lb',
            position: 0
          },
          {
            name: 'Kg',
            position: 1
          },
          {
            name: 'Cwt',
            position: 2
          },
          {
            name: 'Ton',
            position: 3
          },
          {
            name: 'Tonne',
            position: 4
          },
          {
            name: 'CuFt',
            position: 5
          },
          {
            name: 'M3',
            position: 6
          },
          {
            name: 'CuIn',
            position: 7
          },
          {
            name: 'Cc',
            position: 8
          },
          {
            name: 'CuYd',
            position: 9
          },
          {
            name: 'Mi',
            position: 10
          },
          {
            name: 'Km',
            position: 11
          },
          {
            name: 'Ft',
            position: 12
          },
          {
            name: 'M',
            position: 13
          },
          {
            name: 'In',
            position: 14
          },
          {
            name: 'Cm',
            position: 15
          },
          {
            name: 'Yd',
            position: 16
          },
          {
            name: 'SqFt',
            position: 17
          },
          {
            name: 'SqM',
            position: 18
          },
        ]
      },
      {
        field: 'Location Type',
        values: [{
            name: 'Terminal',
            position: 0
          },
          {
            name: 'Through Point',
            position: 1
          },
          {
            name: 'Warehouse',
            position: 2
          },
          {
            name: 'Multi-Purpose',
            position: 3
          },
        ]
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
      {
        field: 'Freight Class',
        values: []
      },
      {
        field: 'Claim Types',
        values: [{
            name: 'Visible Damage',
            position: 0
          },
          {
            name: 'Shortage',
            position: 1
          },
          {
            name: 'Concealed Damage',
            position: 2
          },
          {
            name: 'Concealed Loss',
            position: 3
          },
          {
            name: 'Shipment Loss',
            position: 4
          },
          {
            name: 'Wreck',
            position: 5
          },
          {
            name: 'Delay',
            position: 6
          },
          {
            name: 'Theft',
            position: 7
          },
        ]
      },
      {
        field: 'Haz Class',
        values: [{
            name: '1',
            position: 0
          },
          {
            name: '2',
            position: 1
          },
          {
            name: '2.1',
            position: 2
          },
          {
            name: '2.2',
            position: 3
          },
          {
            name: '2.3',
            position: 4
          },
          {
            name: '3',
            position: 5
          },
          {
            name: '4',
            position: 6
          },
          {
            name: '4.1',
            position: 7
          },
          {
            name: '4.2',
            position: 8
          },
          {
            name: '4.3',
            position: 9
          },
          {
            name: '5',
            position: 10
          },
          {
            name: '5.1',
            position: 11
          },
          {
            name: '5.2',
            position: 12
          },
          {
            name: '6',
            position: 13
          },
          {
            name: '6.1',
            position: 14
          },
          {
            name: '6.2',
            position: 15
          },
          {
            name: '7',
            position: 16
          },
          {
            name: '8',
            position: 17
          },
          {
            name: '9',
            position: 18
          },
        ]
      },
      {
        field: 'Packing Group',
        values: [{
            name: 'None',
            position: 0
          },
          {
            name: 'PGI',
            position: 1
          },
          {
            name: 'PGII',
            position: 2
          },
          {
            name: 'PGIII',
            position: 3
          }
        ]
      },
    ];

    // Import data from Excel
    let workbook = XLSX.readFile(process.cwd() + '/TMS_Drop_Down.xlsx');
    let results = XLSX.utils.sheet_to_json(workbook.Sheets['Product']);
    let productIdx = data.findIndex(val => val.field == 'Product');
    // let nmfcIdx = data.findIndex(val => val.field == 'NMFC')
    let freightClassIdx = data.findIndex(val => val.field == 'Freight Class')

    results.forEach((obj, idx) => {
      if (obj.Product)
        data[productIdx].values.push({
          name: obj.Product,
          position: idx
        });

      if (obj.FreightClass)
        data[freightClassIdx].values.push({
          name: obj.FreightClass,
          position: idx
        });
    });

    data.forEach(async (val, idx) => {
      let dropdown = await Dropdown.create({
        field: val.field
      }).fetch();

      if (dropdown.field == 'Cities') {
        cityDropdownId = dropdown.id;
      }

      data[idx].values.forEach(obj => obj.dropdown = dropdown.id);

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

  if (await Claims.count() > 0) {
    let claims = await Claims.find();
    let uid = claims[claims.length - 1].uid;
    UtilityService.claimCounter = uid;
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
