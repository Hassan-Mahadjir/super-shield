import nodemailer from "nodemailer";
import React from "react";
import ReactDOMServer from "react-dom/server";
import EmailTemplate from "../../components/mail/emailTemplate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_MAIL_USER,
    pass: process.env.GOOGLE_MAIL_PASSWORD,
  },
});

export async function sendOrderMail(orderDetails: any) {
  // Render the email template to HTML
  const html = ReactDOMServer.renderToStaticMarkup(
    <EmailTemplate {...orderDetails} />
  );

  const mailOptions = {
    from: process.env.GOOGLE_MAIL_USER,
    to: process.env.EMAIL_RECEIVER, // your email or customer email
    subject: `Order Confirmation #${orderDetails.orderNumber}`,
    html,
  };

  await transporter.sendMail(mailOptions);
}
