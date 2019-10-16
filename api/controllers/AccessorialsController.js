/**
 * AccessorialsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    getBatchAccessorials: async (req, res) => {
        try {
            let accessorialsIds = req.body.accessorialsIds;

            const accessorials = await Accessorials.find({
                id: {
                    in: accessorialsIds
                }
            }).populateAll();
            res.ok(accessorials);
        } catch (e) {
            res.badRequest(e);
        }
    },

};

