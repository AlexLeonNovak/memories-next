import { NextRequest, NextResponse } from 'next/server';

export const redirectToAdmin = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = '/admin';
  url.search = '';
  return NextResponse.redirect(url);
};
