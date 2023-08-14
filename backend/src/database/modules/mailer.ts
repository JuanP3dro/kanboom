import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "786ca277153d5b",
    pass: "7c29011ccd4794"
  }
});