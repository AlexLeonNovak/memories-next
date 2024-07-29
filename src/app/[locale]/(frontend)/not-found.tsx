import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div>
      <h1 className='text-9xl'>404</h1>
      <p>ooops... Page not found.</p>
      <div>
        <Link href='/'>Go back Home</Link>
      </div>
    </div>
  );
}
