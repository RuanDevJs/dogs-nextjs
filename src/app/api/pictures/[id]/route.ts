import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { ERROR_STATUS, SUCCESS_STATUS  } from "../config";

import { prismaClient } from "@/app/lib/prisma";

interface IContext {
  params: {
    id: string;
  }
}

export async function GET(req: NextRequest, context: IContext) {
  const params = context.params;

  try {
    if(params && params.id){
      const prismaPicture = await prismaClient.picture.findUnique({
        where: {
          id: params.id
        },
      });

      return NextResponse.json(
        { picture: prismaPicture },
        { status: SUCCESS_STATUS.CREATED }
      );
    }

    return NextResponse.json(
      { error: "Picture not found" },
      { status: ERROR_STATUS.NOT_FOUND }
    );
  } catch(error){
    if(error instanceof Error){
      console.log(error.message)
      return NextResponse.json(
        { error: error.message },
        { status: ERROR_STATUS.INTERNAL_SERVER_ERROR }
      );
    }
  }


  return NextResponse.json(
    { error: "Internal server error" },
    { status: ERROR_STATUS.INTERNAL_SERVER_ERROR }
  );

}
