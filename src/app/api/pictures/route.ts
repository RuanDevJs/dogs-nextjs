import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/route";
import { ERROR_STATUS, SUCCESS_STATUS  } from "./config";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(auth);

  if(session === null){
    return NextResponse.json({ message: "USER UNAUTHORIZED" }, { status: ERROR_STATUS.UNAUTHORIZED })
  }


  return NextResponse.json(
    { pictures: [] },
    { status: SUCCESS_STATUS.OK }
  );
}
