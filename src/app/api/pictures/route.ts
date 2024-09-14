import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/route";
import { ERROR_STATUS, SUCCESS_STATUS  } from "./config";
import { prismaClient } from "@/app/lib/prisma";

interface Payload {
  title: string;
  picture_url: string;
  username_id: string;
  username: string;
}

export async function GET(req: NextRequest) {
  console.log("prismaPicture")
  const prismaPicture = await prismaClient.picture.findMany({
    skip: 0,
    take: 6
  });


  return NextResponse.json(
    { pictures: [...prismaPicture] },
    { status: SUCCESS_STATUS.CREATED }
  );
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(auth);
  const payload = await req.json() as Payload;

  if(session === null){
    return NextResponse.json({ message: "USER UNAUTHORIZED" }, { status: ERROR_STATUS.UNAUTHORIZED })
  }

  const prismaPicture = await prismaClient.picture.create({
    data: {
      title: payload.title,
      picture_url: payload.picture_url,
      user_id: payload.username_id,
      username: payload.username,
    }
  });

  return NextResponse.json(
    { pictures: prismaPicture },
    { status: SUCCESS_STATUS.CREATED }
  );
}


