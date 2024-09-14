import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "../../auth/[...nextauth]/route";
import { ERROR_STATUS, SUCCESS_STATUS  } from "../config";

import { prismaClient } from "@/app/lib/prisma";

interface IContext {
  params: {
    userId: string;
  }
}

export async function GET(req: NextRequest, context: IContext) {
  const session = await getServerSession(auth);
  const params = context.params;

  if(session === null){
    return NextResponse.json({ message: "USER UNAUTHORIZED" }, { status: ERROR_STATUS.UNAUTHORIZED })
  }


  if(params && params.userId){
    const prismaPicture = await prismaClient.picture.findMany({
      where: {
        user_id: params.userId
      },

    });

    return NextResponse.json(
      { pictures: [...prismaPicture] },
      { status: SUCCESS_STATUS.CREATED }
    );
  }


  return NextResponse.json(
    { error: "Internal server error" },
    { status: ERROR_STATUS.INTERNAL_SERVER_ERROR }
  );

}
