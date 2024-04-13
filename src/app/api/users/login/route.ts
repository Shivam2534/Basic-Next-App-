import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    // console.log("Email:", email, "Password:", password);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User Not Registerd | user not exist",
        status: 400,
      });
    }
    // console.log("user is:",user)

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({
        message: "Wrong Credentials",
        status: 401,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // to access cookies , the type of variable should be NextResponse
    const response = NextResponse.json({
      message: "user logged in successfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true, // that means that this cookie can not be manupulated from fronted , it can only manupulated from server
    });

    return response;
  } catch (error: any) {
    console.log("Error in login")
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
