import "dotenv/config";
export const sendMail = (message: string, subject?: string) => {
  const nodemailer = require("nodemailer");
  const SERVICE_EMAIL = process.env.SERVICE_EMAIL;
  const HOST_EMAIL = process.env.HOST_EMAIL;
  const EMAIL_PORT = Number(process.env.EMAIL_PORT);
  const USER_AUTH_EMAIL = process.env.USER_AUTH_EMAIL;
  const USER_AUTH_PASSWORD = process.env.USER_AUTH_PASSWORD;
  const USER_NOTIFICATION_EMAIL = process.env.USER_NOTIFICATION_EMAIL;
  const ENABLE_SEND_MAIL = Boolean(process.env.ENABLE_SEND_MAIL);
  if (ENABLE_SEND_MAIL) {
    const transport = nodemailer.createTransport({
      service: SERVICE_EMAIL,
      host: HOST_EMAIL,
      port: EMAIL_PORT,
      auth: {
        user: USER_AUTH_EMAIL,
        pass: USER_AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: "notificador-notas-uoc@gmail.com",
      to: USER_NOTIFICATION_EMAIL,
      subject: `${subject || ""} ${new Date().toISOString()}`,
      text: "Hello People!, Welcome to Bacancy!",
    };
    mailOptions.text = message;
    transport.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        console.log(err);
      } else {
        console.log(new Date() + " info:" + JSON.stringify(info));
      }
    });
  }
};
