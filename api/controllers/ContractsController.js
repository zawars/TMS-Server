/**
 * ContractsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const io = sails.io;

io.on('connection', socket => {

  socket.on('contractsCount', async data => {
    let count = await Contracts.count();
    socket.emit('contractsCount', count);
  });

  socket.on('contractsIndex', async data => {
    let result = await Contracts.find().paginate(data.pageNumber, data.pageSize).populateAll();
    socket.emit('contractsIndex', result);

  });

  socket.on('searchContracts', async data => {
    let result = await Contracts.find({
      name: {
        startsWith: data.query
      }
    }).limit(10).populateAll();

    socket.emit('searchContracts', result);
  });
});

module.exports = {
  create: async (req, res) => {
    let contract = req.body;
    let rateSheetList = contract.rateSheets;
    let accessorialList = contract.accessorials;
    delete(contract.rateSheets);
    delete(contract.accessorials);

    let contractObj = await Contracts.create(contract).fetch();
    let rateSheets;
    let accessorials;

    let ratesCollection = [];
    if (this.rateSheetList != undefined) {
      rateSheetList.map(rateSheet => {
        rateSheet.contract = contractObj.id
        ratesCollection.push(rateSheet.rates);
        delete(rateSheet.rates);
      });

      rateSheets = await RateSheets.createEach(rateSheetList).fetch();
    }

    if (accessorialList != undefined) {
      accessorialList.map(accessorial => {
        accessorial.contract = contractObj.id
      });

      accessorials = await Accessorials.createEach(accessorialList).fetch();
    }

    ratesCollection.map(async (rateList, idx) => {
      rateList.map(rate => rate.rateSheet = rateSheets[idx].id);
      rateSheets[idx].rates = await Rates.createEach(rateList).fetch();
    });

    contractObj.rateSheets = rateSheets;
    contractObj.accessorials = accessorials;

    res.ok(contractObj);
  },

};
