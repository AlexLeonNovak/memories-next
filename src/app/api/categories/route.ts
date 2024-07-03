import {NextRequest, NextResponse} from 'next/server';
import {TCategory} from '@/types';
import { db } from '@/services';

export async function POST(req: NextRequest) {
  const data: TCategory = await req.json();
  const cat = await db.categories.create(data);
  console.log(cat);
  return NextResponse.json(cat);
}

export async function GET() {

}
