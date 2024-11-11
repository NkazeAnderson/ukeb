import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "info@ukmetropolitanbank.com",
    pass: process.env.MailPass || "",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export default async ({ req, res, log, error }) => {
  // send mail with defined transport object
  try {
    const { to, text, subject } = req.bodyJson;
    const info = await transporter.sendMail({
      from: '"Metropolitan Bank" <info@ukmetropolitanbank.com>', // sender address
      to, // list of receivers
      subject,// Subject line
      text, // plain text body
    //  html: "<b>Hello world?</b>", // html body
    });
    return res.text("ok");
  } catch (e) {
    error(e);
    return res.text("bad");
  }

};
