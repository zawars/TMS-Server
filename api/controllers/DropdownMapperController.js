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
    }).then(dropdownObj => {
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
      }).then(response => {
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
  }
};
