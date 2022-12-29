import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";


export async function middleware(req: NextRequest) {
  
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  if (session === null) {
    console.log('Not Authenticated')                

    const url = req.nextUrl.clone();
    url.pathname = '/login';


    return NextResponse.redirect(url);
  }

  console.log('middleware', session);
  console.log('Success Authenticated');  
  
  return NextResponse.next();      
}
