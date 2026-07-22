const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

//new Email(user,url).sendWelcome()

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `K.Prakassh <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    //production sendgrid
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }
    //dev mailtrap
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    //actually send email
    //1.render a html based on pug template
    const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`);
    //2.define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.fromString(html),
    };

    //3.create a transport and send Email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'welcome to natours family');
  }
};

// const sendEmail = async (options) => {
//   //1.Create a transporter - Configure your SMTP server or another supported transport method.

//     //activate in gmail "less secure" app option dont use gmail bcs marked as spammer etc
//     //use sendgrid or mailgun
//     //mailtrap

//   //2.Compose your message - Define the sender, recipient(s), subject, and content.
