// "use strict";
// https://www.youtube.com/watch?v=-rcRf7yswfM&ab_channel=MafiaCodes
const nodemailer = require("nodemailer");
const {google} = require('googleapis');

const CLIENT_ID = "390852291356-qm0uk2pn454uof866d6h822ko0i349e1.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04_BhhZOIFdaGCgYIARAAGAQSNwF-L9IrCQaydMNnxrXHuFPxlBLdMAee83rUMpUA0wIJ4ITVxGRG3IDlJD4ZWioG2WS5lYEj0XI";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to,subject,htmlBody,message) {

  const accessToken = await oauth2Client.getAccessToken();
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'hammadasgharm@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"INoteBook ✉️" <hammadasgharm@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: htmlBody, // html body
  });

  console.log("Message sent: %s", info);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


module.exports=sendMail;