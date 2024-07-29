'use client';

import { Button } from '@/components';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className='text-center space-y-5'>
      <h1 className='text-9xl'>404</h1>
      <p className='text-3xl'>Page not found.</p>
      <div>
        <Button
          variant='link'
          onClick={() => {
            router.back();
          }}
        >
          Go back
        </Button>
      </div>
    </div>
  );
}
