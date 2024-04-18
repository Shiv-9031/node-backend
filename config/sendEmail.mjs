import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (to, subject, message) => {
  try {
    const resend = new Resend(process.env.RESEND_KEY_API);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      text: message,
    });
  } catch (error) {
    console.error(error);
  }
};
