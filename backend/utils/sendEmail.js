import { BrevoClient } from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  console.error("❌ BREVO_API_KEY is not configured");
}

const brevo = new BrevoClient({
  apiKey,
});

export const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    if (!apiKey) {
      throw new Error("BREVO_API_KEY is not configured");
    }

    if (!process.env.EMAIL_FROM) {
      throw new Error("EMAIL_FROM is not configured");
    }

    if (!to) {
      throw new Error("Recipient email address is required");
    }

    const result = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Welsna Logistics",
        email: process.env.EMAIL_FROM,
      },

      to: [
        {
          email: to,
        },
      ],

      subject,
      htmlContent: html,
    });

    console.log(`✅ Email sent successfully to ${to}`);
    console.log("Brevo Message ID:", result.messageId);

    return result;
  } catch (error) {
    console.error("❌ Brevo Email Error:");

    console.error("Message:", error?.message || error);

    if (error?.body) {
      console.error("Brevo response:", error.body);
    }

    throw error;
  }
};