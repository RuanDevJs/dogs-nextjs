import { prismaClient } from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface IPayload {
  name: string;
  username: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const payload = (await req.json()) as IPayload;
  const cookieStore = cookies();

  if (!payload.name || !payload.username) {
    return NextResponse.json({ message: "Missing Payloads" }, { status: 400 });
  }

  const prismaUser = await prismaClient.user.create({
    data: {
      username: payload.username,
      name: payload.name,
    },
  });

  cookieStore.set("@dogs-social-login:userId", prismaUser.id, {
    path: "/",
  });

  return NextResponse.json(
    { username: prismaUser.username, name: prismaUser.name },
    { status: 201 }
  );
}
