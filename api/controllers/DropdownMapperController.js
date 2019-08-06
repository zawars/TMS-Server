/**
 * DropdownMapperController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
let langsList = ['de', 'fr'];

module.exports = {
  show: (req, res) => {
    let id = req.params.id;
    let langs = {};
    let langFiles = {};

    langsList.map(val => {
      langFiles[val] = JSON.parse(fs.readFileSync(`assets/langs/${val}.json`));
    });

    DropdownMapper.findOne({
      id: id
    }).populateAll().then(dropdownObj => {
      if (dropdownObj != undefined) {
        let temp = {};
        langsList.map(val => {
          langs[val] = langFiles[val][dropdownObj.name];
          temp[val] = langs[val];
        });

        res.ok({
          data: dropdownObj,
          ...temp
        });
      } else {
        res.badRequest({
          message: 'Data not Found'
        });
      }
    });
  },

  create: async (req, res) => {
    let data = req.body;
    let obj = data.dropdown;
    let langs = {};
    let langFiles = {};

    langsList.map(val => {
      langs[val] = data[val];
      langFiles[val] = JSON.parse(fs.readFileSync(`assets/langs/${val}.json`));
      langFiles[val][obj.name] = langs[val];
      fs.writeFileSync(`assets/langs/${val}.json`, JSON.stringify(langFiles[val], null, 2));
    });

    let response = await DropdownMapper.create(obj).fetch();

    res.ok(response);
  },

  delete: (req, res) => {
    let id = req.params.id;
    let langFiles = {};

    langsList.map(val => {
      langFiles[val] = JSON.parse(fs.readFileSync(`assets/langs/${val}.json`));
    });

    DropdownMapper.findOne({
      id: id
    }).then(dropdownObj => {
      langsList.map(val => {
        delete(langFiles[val][dropdownObj.name]);
        fs.writeFileSync(`assets/langs/${val}.json`, JSON.stringify(langFiles[val], null, 2));
      });

      DropdownMapper.destroy({
        id: id
      }).then(response => {
        res.ok({
          data: response,
        });
      });
    });
  },

  update: (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let obj = data.dropdown;
    let langs = {};
    let langFiles = {};

    langsList.map(val => {
      langs[val] = data[val];
      langFiles[val] = JSON.parse(fs.readFileSync(`assets/langs/${val}.json`));
    });

    DropdownMapper.findOne({
      id: id
    }).then(dropdownObj => {
      langsList.map(val => {
        delete(langFiles[val][dropdownObj.name]);
        langFiles[val][obj.name] = langs[val];
        fs.writeFileSync(`assets/langs/${val}.json`, JSON.stringify(langFiles[val], null, 2));
      });

      DropdownMapper.update({
        id: id
      }).set({
        name: obj.name
      }).fetch().then(response => {
        res.ok({
          data: response,
          ...langFiles
        });
      });
    });
  },

  positionSort: async (req, res) => {
    let data = req.body;

    data.forEach(async val => {
      await DropdownMapper.update({
        id: val.id
      }).set({
        position: val.position
      });
    });

    res.ok(data);
  },

  import: async (req, res) => {
    let data = req.body;
    const fs = require('fs');
    const XLSX = require('xlsx');
    let workbook = XLSX.readFile(data.path);
    let results = XLSX.utils.sheet_to_json(workbook.Sheets['Part 1']);
    let part2 = XLSX.utils.sheet_to_json(workbook.Sheets['Part 2']);
    let citiesSet = {};
    results.push(...part2);

    results.map(row => {
      if (citiesSet[row.City] != undefined) {
        citiesSet[row.City].push({
          name: row.Zip
        });
      } else {
        citiesSet[row.City] = [];
        citiesSet[row.City].push({
          name: row.Zip
        });
      }
    });

    let keys = Object.keys(citiesSet);
    keys.map(async key => {
      let dropdownMapper = await DropdownMapper.create({
        name: key,
        dropdown: data.dropdown
      }).fetch();
      citiesSet[key].forEach(zipObj => zipObj.dropdownMapper = dropdownMapper.id);
      let childs = await DropdownMapperChild.createEach(citiesSet[key]).fetch();
    });

    fs.unlink(data.path, function (err) {
      if (err) return console.log(err); // handle error as you wish
      res.ok({
        message: 'Data Imported successfully.'
      });
    });
  }
};
