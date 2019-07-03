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
  if (await Dropdown.count() == 0) {
    let data = [
      {
        field: 'Country',
        values: []
      },
      {
        field: 'Handling Unit',
        values: [
          // {
          //   name: 'Software Development',
          //   position: 1,
          // },
          // {
          //   name: 'Logo Design',
          //   position: 0,
          // },
          // {
          //   name: 'Brochure Design',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Design',
          //   position: 0,
          // },
          // {
          //   name: 'Website Development',
          //   position: 0,
          // },
          // {
          //   name: 'Front End Development',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Development',
          //   position: 0,
          // },
          // {
          //   name: 'Web Application Design',
          //   position: 0,
          // },
        ]
      },
      {
        field: 'Weight Unit',
        values: [
          // {
          //   name: 'Software Development',
          //   position: 1,
          // },
          // {
          //   name: 'Logo Design',
          //   position: 0,
          // },
          // {
          //   name: 'Brochure Design',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Design',
          //   position: 0,
          // },
          // {
          //   name: 'Website Development',
          //   position: 0,
          // },
          // {
          //   name: 'Front End Development',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Development',
          //   position: 0,
          // },
          // {
          //   name: 'Web Application Design',
          //   position: 0,
          // },
        ]
      },
      {
        field: 'Length Unit',
        values: [
          // {
          //   name: 'Software Development',
          //   position: 1,
          // },
          // {
          //   name: 'Logo Design',
          //   position: 0,
          // },
          // {
          //   name: 'Brochure Design',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Design',
          //   position: 0,
          // },
          // {
          //   name: 'Website Development',
          //   position: 0,
          // },
          // {
          //   name: 'Front End Development',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Development',
          //   position: 0,
          // },
          // {
          //   name: 'Web Application Design',
          //   position: 0,
          // },
        ]
      },
      {
        field: 'Cube Unit',
        values: [
          // {
          //   name: 'Software Development',
          //   position: 1,
          // },
          // {
          //   name: 'Logo Design',
          //   position: 0,
          // },
          // {
          //   name: 'Brochure Design',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Design',
          //   position: 0,
          // },
          // {
          //   name: 'Website Development',
          //   position: 0,
          // },
          // {
          //   name: 'Front End Development',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Development',
          //   position: 0,
          // },
          // {
          //   name: 'Web Application Design',
          //   position: 0,
          // },
        ]
      },
      {
        field: 'Class',
        values: [
          // {
          //   name: 'Software Development',
          //   position: 1,
          // },
          // {
          //   name: 'Logo Design',
          //   position: 0,
          // },
          // {
          //   name: 'Brochure Design',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Design',
          //   position: 0,
          // },
          // {
          //   name: 'Website Development',
          //   position: 0,
          // },
          // {
          //   name: 'Front End Development',
          //   position: 0,
          // },
          // {
          //   name: 'Mobile Application Development',
          //   position: 0,
          // },
          // {
          //   name: 'Web Application Design',
          //   position: 0,
          // },
        ]
      },
    ];

    data.forEach(async val => {
      let dropdown = await Dropdown.create({
        field: val.field
      }).fetch();

      val.values.forEach(obj => {
        dropdown: dropdown.id
      });

      await DropdownMapper.createEach(val.values);
    });
    console.log('Dropdown seeds planted. Ready to grow.');
  }

};
