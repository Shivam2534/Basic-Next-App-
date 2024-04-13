import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/helpers/getUserId";
import { User } from "@/models/userModel";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req); // calling a function to find userId
    if (!userId) {
      return NextResponse.json({
        Error: "User Id not found",
        success: false,
      });
    }

    const user = await User.findOne({ _id: userId }).select("-password");
    
    return NextResponse.json({
      message: "Profile fetched successfully",
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
