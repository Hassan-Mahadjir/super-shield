"use client";
import nodemailer from "nodemailer";
import React from "react";
import ReactDOMServer from "react-dom/server";
import EmailTemplate from "../../components/mail/emailTemplate";
import EmailTemplateAr from "@/components/mail/emailTemplate-AR";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_MAIL_USER,
    pass: process.env.GOOGLE_MAIL_PASSWORD,
  },
});

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  orderItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    description?: string;
  }>;
  totalPrice: number;
  discountAmount: number;
  finalTotal: number;
  orderDate: string;
  carMake: string;
  carModel: string;
  carType: string;
  frontWindow: string;
  sidesfrontWindow: string;
  sidesbackWindow: string;
  backWindow: string;
  thirdWindow?: string;
  extraWindow?: string;
  extraCost: number;
  locale: string;
}

export async function sendOrderMail(orderDetails: OrderDetails) {
  let html;

  if (orderDetails.locale === "ar") {
    html = ReactDOMServer.renderToStaticMarkup(
      <EmailTemplateAr {...orderDetails} />
    );
  } else {
    html = ReactDOMServer.renderToStaticMarkup(
      <EmailTemplate {...orderDetails} />
    );
  }

  const mailOptions = {
    from: process.env.GOOGLE_MAIL_USER,
    to: process.env.EMAIL_RECEIVER, // your email or customer email
    subject:
      orderDetails.locale === "ar"
        ? `الطلب #${orderDetails.orderNumber}`
        : `${orderDetails.orderNumber}# Order`,
    html,
  };

  await transporter.sendMail(mailOptions);
}
