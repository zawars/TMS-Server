/**
 * DropdownController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
let langsList = ['de', 'fr'];

module.exports = {
  index: (req, res) => {
    Dropdown.find().populate('values', {
      sort: 'position ASC'
    }).then(dropdownList => {
      res.ok(dropdownList);
    }).catch(err => {
      res.badRequest(err);
    });
  },

  update: async (req, res) => {
    let data = req.body;
    let langs = {};
    let langsFile = {};
    let options = {
      encoding: 'utf-8',
      flag: 'w'
    };
    let en = data.values[data.values.length - 1].name;

    langsList.map(val => {
      langs[val] = data[val];
      langsFile[val] = JSON.parse(fs.readFileSync(`assets/langs/${val}.json`, 'utf8'));
      langsFile[val] = langs[val];
      fs.writeFileSync(`assets/langs/${val}.json`, JSON.stringify(langsFile[val], null, 2), options);
      delete(data[val]);
    });

    await Dropdown.update({
      id: req.params.id
    }).set({
      values: data.values
    })
    let updatedDropdown = await Dropdown.findOne({
      id: req.params.id
    }).populate('values');

    let obj = {};
    langs.map(val => obj[val] = langsFile[val]);

    res.created({
      updatedDropdown,
      ...obj
    });
  }


};
