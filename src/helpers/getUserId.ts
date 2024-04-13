import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export const getUserId = async (req: NextRequest) => {
  try {
    const Encodedtoken = req.cookies.get("token")?.value || "";
    const decodedtoken: any = Jwt.verify(
      Encodedtoken,
      process.env.TOKEN_SECRET!
    ); // it will return a decoded token
    return decodedtoken.id;
  } catch (error) {
    return NextResponse.json({
      Message: "Invalid token",
    });
  }
};
