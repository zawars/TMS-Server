/**
 * MarkupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const io = sails.io;

io.on('connection', socket => {

  socket.on('markupCount', async data => {
    let count = await Markup.count();
    socket.emit('markupCount', count);
  });

  socket.on('markupsIndex', async data => {
    let result = await Markup.find().paginate(data.pageNumber, data.pageSize).populateAll();
    socket.emit('markupIndex', result);
  });

});

module.exports = {
  create: async (req, res) => {
    let data = req.body;
    data.customer = data.customer.id;
    data.vendor = data.vendor.id;
    // let rates = await Rates.find({
    //   rateSheet: data.rateSheet
    // }).populateAll();

    // rates.map(async rate => {
    //   let markup = rate.minCharge * data.defaultPercentage / 100;

    //   if (data.minAmount < markup) {
    //     rate.appliedMarkup = data.minAmount;
    //   } else if (markup < data.maxAmount) {
    //     rate.appliedMarkup = markup;
    //   } else if (data.maxAmount < markup) {
    //     rate.appliedMarkup = data.maxAmount;
    //   }

    //   await Rates.update({
    //     id: rate.id
    //   }).set({
    //     appliedMarkup: rate.appliedMarkup
    //   });
    // });

    let markup = await Markup.create(data).fetch();
    res.ok(markup);
  },

  update: async (req, res) => {
    let data = req.body;
    data.customer = data.customer.id;
    data.vendor = data.vendor.id;
    // let rates = await Rates.find({
    //   rateSheet: data.rateSheet
    // }).populateAll();

    // rates.map(async rate => {
    //   let markup = rate.minCharge * data.defaultPercentage / 100;

    //   if (data.minAmount < markup) {
    //     rate.appliedMarkup = data.minAmount;
    //   } else if (markup < data.maxAmount) {
    //     rate.appliedMarkup = markup;
    //   } else if (data.maxAmount < markup) {
    //     rate.appliedMarkup = data.maxAmount;
    //   }

    //   await Rates.update({
    //     id: rate.id
    //   }).set({
    //     appliedMarkup: rate.appliedMarkup
    //   });
    // });

    let markup = await Markup.update({
      id: req.params.id
    }).set(data).fetch();
    res.ok(markup);
  }

};
