'use client';

import {LogOut} from 'lucide-react';
import {Button} from '@/components';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/hooks';

export const Header = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogOut = async () => {
    await logout();
    router.push('/');
  }

  return (
    <div className="flex h-[60px] border-b gap-4 bg-gray-50 items-center justify-end px-4">
      <Button onClick={handleLogOut} className="flex items-center gap-2 font-semibold">
        <LogOut />
        Logout
      </Button>
    </div>
  )
}
