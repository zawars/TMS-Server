// const sendmail = require('sendmail')({});

const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({
//   name: 'www.bkw-oneview.com',
//   host: 'mail3.gridhost.co.uk', //"mail.infomaniak.com",
//   port: 25, //587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'claims@crekey.com', //'project.notification@bkw-oneview.com', // generated ethereal user
//     pass: 'Crekey2019$$', //'kitcHlew2277$$$' // generated ethereal password
//   },
// });

const emailId = 'saad.afzaal7777@gmail.com';

let opts = {
  service: 'Gmail',
  auth: {
    user: emailId,
    pass: 'Roger123'
  }
}

let transporter = nodemailer.createTransport(opts);

module.exports = {

  // sendMail: (options, done) => {
  //   sendmail({
  //     from: 'project.notification@bkw-oneview.com',
  //     to: options.email,
  //     subject: options.subject,
  //     html: options.message + `<br><br>
  //     <div>Freundliche Grüsse / Meilleures salutations / Best Regards,<br><br>
  //     <strong>oneView</strong><br><br>

  //     Dies ist eine vom System generierte Mail. Bitte Antworten Sie nicht darauf. Bei Fragen oder Anliegen wenden Sie sich an den Applikationsverantwortlichen oder an den Service Desk der BKW.									
  //     This is an automatically generated message. Please do not reply to this message. For Questions please contact application responsible or BKW service desk.
  //     </div>`
  //   }, function (err, reply) {
  //     if (err) {
  //       return done(err);
  //     }
  //     return done();
  //   });
  // }

  sendMail: async (options, done) => {
    transporter.sendMail({
      from: 'claims@crekey.com', //'project.notification@bkw-oneview.com',
      to: options.email,
      subject: options.subject,
      html: options.message +
        `<br><br>
      Best Regards,<br>
      <strong>Röhlig Claim Management</strong>`

      // <div>Freundliche Grüsse / Meilleures salutations / Best Regards,<br><br>
      // <strong>oneView</strong><br><br>

      // Dies ist eine vom System generierte Mail. Bitte Antworten Sie nicht darauf. Bei Fragen oder Anliegen wenden Sie sich an den Applikationsverantwortlichen oder an den Service Desk der BKW.									
      // This is an automatically generated message. Please do not reply to this message. For Questions please contact application responsible or BKW service desk.
      // </div>`
    }, (err, info) => {
      if (err) {
        return done(err);
      }

      console.log("Message sent: %s", info.messageId);
      return done();
    });
  }
};
