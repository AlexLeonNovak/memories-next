import {revalidatePath, revalidateTag} from 'next/cache';
import {TCategory} from '@/types';
import { CategoryRepository } from '@/lib/repositories';

export async function POST(req: Request) {
  const data: TCategory = await req.json();
  const cat = await CategoryRepository.create(data);
  revalidateTag('categories');
  return Response.json(cat);
}

// export async function GET() {
//   const categories = await CategoryRepository.getAll();
//   return NextResponse.json(categories);
// }
