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

  socket.on('contractssIndex', async data => {
    let result = await Contracts.find().paginate(data.pageNumber, data.pageSize).populateAll();
    socket.emit('contractsIndex', result);
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

    let ratesCollection = [];
    rateSheetList.map(rateSheet => {
      rateSheet.contract = contractObj.id
      ratesCollection.push(rateSheet.rates);
      delete(rateSheet.rates);
    });

    accessorialList.map(accessorial => {
      accessorial.contract = contractObj.id
    });

    let rateSheets = await RateSheets.createEach(rateSheetList).fetch();
    let accessorials = await Accessorials.createEach(accessorialList).fetch();

    ratesCollection.map(async (rateList, idx) => {
      rateList.map(rate => rate.rateSheet = rateSheets[idx].id);
      rateSheets[idx].rates = await Rates.createEach(rateList).fetch();
    });

    contractObj.rateSheets = rateSheets;
    contractObj.accessorials = accessorials;

    res.ok(contractObj);
  },

};
