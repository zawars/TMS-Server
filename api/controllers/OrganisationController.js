/**
 * OrganisationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const io = sails.io;

io.on('connection', socket => {

  socket.on('organisationCount', async data => {
    let count = await Organisation.count();
    socket.emit('organisationCount', count);
  });

  socket.on('organisationIndex', async data => {
    let result = await Organisation.find().paginate(data.pageNumber, data.pageSize).populateAll();
    socket.emit('organisationIndex', result);
  });

});

module.exports = {
  search: async (req, res) => {
    try {

      let query = req.params.query;

      let result = await Organisation.find({
        name: {
          'startsWith': query
        }
      }).populateAll().limit(10);

      res.ok(result);
    } catch (error) {
      res.badRequest(error);
    }
  }

};
