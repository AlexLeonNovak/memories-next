import Link from 'next/link';
import {LogOut} from 'lucide-react';

export const Header = () => {
  return (
    <div className="flex h-[60px] border-b gap-4 bg-gray-50 items-center justify-end px-4">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <LogOut />
        Logout
      </Link>
    </div>
  )
}
