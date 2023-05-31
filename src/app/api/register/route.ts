import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
import { NextApiRequest } from "next";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { username, email, password } = res;

    const existingUser = await prismadb.user.findUnique({ 
      where: { 
        email 
      } 
    });

    if(existingUser)
    {
      return NextResponse.json({ error: "Email taken" }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        name: username,
        email,
        hashedPassword,
        image: '',
        emailVerified: new Date()
      },
    })

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function GET(req: Request, res: Response) {
  return NextResponse.json({ hello: "World" });
}
