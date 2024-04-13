import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    // console.log("Token is-", token);
    if (!token) {
      throw Error("Token not found");
    }

    const user = await User.findOne({
      VerifyToken: token,
      VerifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        error: "Invalid Token",
        status: 400,
      });
    }

    user.isVerified = true;
    user.VerifyToken = undefined;
    user.VerifyTokenExpiry = undefined;
    await user.save();

    // console.log(user);

    return NextResponse.json({
      message: "user verification successfull",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
