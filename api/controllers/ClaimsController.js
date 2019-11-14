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

  index: async (req, res) => {
    try {
      let claims = await Claims.find().populateAll().sort('createdAt DESC');
      res.ok(claims);
    } catch (error) {
      res.ok({
        message: error
      });
    }
  },

  create: async (req, res) => {
    try {
      let data = req.body;
      let claim = await Claims.create(data).fetch();
      let emailsList = [];

      emailsList.push(data.contactEmail);

      let organisation = await Organisation.findOne({
        id: claim.customer.organisation
      }).populateAll;

      console.log(organisation)

      EmailService.sendMail({
        email: emailsList,
        subject: `New Claim # ${responseClaim.uid}`,
        message: `<p>
        Dear Sir/Madam, <br><br>
        Your claim has been registered. Please see details below. <br><br>

        BOL: ${responseClaim.bolNumber} <br> PRO: ${responseClaim.proNumber} <br> Claimant Information <br> 
        ${responseClaim.claimantName} <br> ${responseClaim.address1} <br> ${responseClaim.city.name} <br> 
        ${responseClaim.postalCode.name} <br> ${responseClaim.phone} <br> ${responseClaim.email} <br>  <br> 

        We will update you as soon as possible.<br>
        Thank you for your understanding.<br><br>
        </p>`
      }, (err) => {
        if (err) {
          res.badRequest({
            message: "Error sending email."
          });
        } else {
          res.ok(claim);
        }
      });
    } catch (error) {
      res.badRequest({
        error
      });
    }
  },

};
