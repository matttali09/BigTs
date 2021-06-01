const router = require("express").Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = "1//047YvDRz4kJMGCgYIARAAGAQSNwF-L9IrTUkJEOqrVZEyv6KS4DlTP9nNZDhrqtAOdb0-ThjnHza-TRGuI9UzQ-9NSzERhHoSQhI";

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'oAuth3',
        user: 'yourstruly@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    })
    
    const mailOptions = {
      from: 'BigTsCharters <BigTsCharters@gmail.com>',
      to: 'matttaliancich09@gmail.com',
      subject: "Scheduled Date for BigTsCharters",
      text: 'Hello from BigTsCharters using API',
      html: '<h1>Hello from BigTsCharters using API</h1>'
    }

    const result = await transport.sendMail(mailOptions);
    return result;

  } catch (error) {
    return error
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message))

router.post('/', (req, res) => {
  console.log(req.body);

  sendMail
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message))

  // const email = req.body.email;
  // const htmlEmail = `
  //   <h3>Contact Details</h3>
  //   <ul>
  //     <li>Name: ${req.body.name}</li>
  //     <li>Email: ${req.body.email}</li>
  //   </ul>
  //   <h3>Message</h3>
  //   <p>${req.body.message}</p>
  // `;


  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // })
  // return res
});

module.exports = router;
// "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);