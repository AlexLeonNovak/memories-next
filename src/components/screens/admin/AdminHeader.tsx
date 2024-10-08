'use client';

import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { LanguageSwitcher, SubmitButton } from '@/components/shared';
import { useFormCheck } from '@/hooks';
import { useRouter } from '@/navigation';
import { logout } from '@/server/actions/auth.actions';

export const AdminHeader = () => {
  const tAdm = useTranslations('Admin');
  const router = useRouter();
  const [state, action] = useFormState(logout, null);
  useFormCheck({ state, onFinally: () => router.replace('/') });

  return (
    <div className='flex h-[60px] border-b gap-4 bg-gray-50 items-center justify-end px-4'>
      <LanguageSwitcher />
      <form action={action}>
        <SubmitButton label={tAdm('Logout')} pendingLabel={tAdm('wait')} icon={<LogOut />} className='w-full' />
        {/*<Button onClick={handleLogOut} className='flex items-center gap-2 font-semibold w-full'>*/}
        {/*  <LogOut />*/}
        {/*  <span>Logout</span>*/}
        {/*</Button>*/}
      </form>
    </div>
  );
};
