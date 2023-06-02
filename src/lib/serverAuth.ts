import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from '@/lib/prismadb';

const serverAuth = async () => {
  const session = await getServerSession(authOptions);

  console.log(session)
  console.log(session?.user?.email)

  if(!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email
    },
  })

  console.log(currentUser);

  if(!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser }
}

export default serverAuth;