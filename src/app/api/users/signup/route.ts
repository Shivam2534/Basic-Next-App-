import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(req: NextRequest) {
  const reqBody = await req.json(); // it take some time
  const { username, email, password } = reqBody;
  // also do validations
  console.log(username, email, password);

  // checking for pre-existing
  const user = await User.findOne({ email });

  if (user) {
    return NextResponse.json({ error: "user already exist", status: 500 });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedpassword = await bcryptjs.hash(password, salt);

  const newUser = new User({
    // just create new model of user not intracted with DB yet
    username,
    email,
    password: hashedpassword,
  });

  const savedUser = await newUser.save();
  console.log(savedUser);

  // now we are sending mail for verifying user...

  await sendEmail({ email, emailType: "Verify", userId: savedUser?._id });

  return NextResponse.json({
    message: "user Registration successfull",
    success: true,
    savedUser,
  });
}
