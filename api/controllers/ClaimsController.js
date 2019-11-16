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
      let userEmail = data.userEmail;
      delete(data.userEmail);
      let claim = await Claims.create(data).fetch();
      claim = await Claims.findOne({
        id: claim.id
      }).populateAll();
      let emailsList = [];
      emailsList.push(data.contactEmail, userEmail);

      let organisation = await Organisation.findOne({
        id: claim.customer.organisation
      }).populateAll();
      emailsList = Array.from(new Set(emailsList));

      EmailService.sendMail({
        email: emailsList,
        subject: `New Claim # ${claim.uid}`,
        message: `<p>
        Dear Sir/Madam, <br><br>
        Your claim has been registered. Please see details below. <br><br>

        BOL: ${claim.bolNumber} <br> PRO: ${claim.proNumber} <br> Claimant Information <br> 
        ${claim.claimantName} <br> ${claim.address1} <br> ${claim.city.name} <br> 
        ${claim.postalCode.name} <br> ${claim.phone} <br> ${claim.email} <br>  <br> 

        We will update you as soon as possible.<br>
        Thank you for your understanding.<br><br>
        </p>`
      }, (err) => {
        if (err) {
          res.badRequest({
            message: "Error sending email."
          });
        } else {
          emailsList = [];
          if (organisation.users.length > 0) {
            organisation.users.forEach(user => {
              if (user.roles.includes('Claim Manager')) {
                emailsList.push(user.email);
              }
            });
          }
          emailsList = Array.from(new Set(emailsList));

          EmailService.sendMail({
            email: emailsList,
            subject: `New Claim # ${claim.uid}`,
            message: `<p>
            Dear Claim Manager, <br><br>
            A new claim# ${claim.uid} has been reported. Please see the details below.
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
        }
      });
    } catch (error) {
      res.badRequest({
        error
      });
    }
  },

  update: async (req, res) => {
    try {
      let data = req.body;
      let userEmail = data.userEmail;
      delete(data.userEmail);
      let claim = await Claims.updateOne({
        id: req.params.id
      }).set(data);

      claim = await Claims.findOne({
        id: claim.id
      }).populateAll();

      let emailsList = [];
      emailsList.push(data.contactEmail, userEmail);

      let organisation = await Organisation.findOne({
        id: claim.customer.organisation
      }).populateAll();
      emailsList.push(data.contactEmail);
      if (organisation.users.length > 0) {
        organisation.users.forEach(user => {
          if (user.roles.includes('Claim Manager')) {
            emailsList.push(user.email);
          }
        });
      }
      emailsList = Array.from(new Set(emailsList));


      EmailService.sendMail({
        email: emailsList,
        subject: `New Claim # ${claim.uid}`,
        message: `<p>
        Dear Sir/Madam, <br><br>

        Claim # (${claim.uid}) has been updated.<br><br> 

        Please log in via below link to view the changes.<br><br>

        http://claim.crekey.solutions/#/claims/${claim.id} <br><br>

        For any questions or concerns please use the comment section on the claim form. <br><br>
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
  }

};
