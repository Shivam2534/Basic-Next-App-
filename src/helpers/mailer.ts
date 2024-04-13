import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "@/models/userModel";

// we are using Mailtrap to send mail
export const sendEmail = async ({ email, emailType, userId }: any) => {
  const hashedToken = await bcryptjs.hash(userId.toString(), 10);

  if (emailType === "Verify") {
    await User.findByIdAndUpdate(userId, {
      VerifyToken: hashedToken,
      VerifyTokenExpiry: Date.now() + 3600000,
    });
  } else if (emailType === "Reset") {
    await User.findByIdAndUpdate(userId, {
      ForgotPasswordToken: hashedToken,
      ForgotPasswordTokenExpiry: Date.now() + 3600000,
    });
  }

  try {
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1bd7ae7413f11e",
        pass: "e2c4c3e972eb08",
      },
    });

    const mailOptions = {
      from: "shivamkanchole111@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "Verify" ? "Verify your email" : "Reset your password", // Subject line

      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}">here</a> to ${
        emailType === "Verify" ? "Verify your email" : "Reset your password"
      } or Copy paste thebelow URl link to the browser. 
      <br>
      link - ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
