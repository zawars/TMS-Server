/**
 * ClaimsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getClaimByCustomer: async (req, res) => {
        try {
            let claims = await Claims.find({
							customer: req.params.id,
            }).populateAll().sort('createdAt DESC');

            res.ok(claims);
        } catch (error) {
            res.ok({
                message: error
            });
        }
		},
		
		getAllClaims: async (req, res) => {
			try {
					let claims = await Claims.find().populateAll().sort('createdAt DESC');
					res.ok(claims);
			} catch (error) {
					res.ok({
							message: error
					});
			}
	},

};

