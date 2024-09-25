const nodemailer = require("nodemailer");

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
  const { email, type, name } = req.bodyJson;
  log(email);
  try {
    const info = await transporter.sendMail({
      from: '"Metropolitan Bank" <info@ukmetropolitanbank.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    log("Message sent: %s", info);
    res.text("send");
  } catch (e) {
    error(e);
  }

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
