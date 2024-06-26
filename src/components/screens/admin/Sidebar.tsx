import Link from 'next/link';
import Image from 'next/image';
import {NavItem} from '.';
import {CircleGauge} from 'lucide-react';


export const Sidebar = () => {
  return (
    <aside className="border-r bg-gray-50">
      <div className="flex h-[60px] items-center justify-center border-b">
        <Link href="/" className="text-3xl">
          <Image src="/logo.svg" alt="Zberezhemo logo" width={175} priority height={37}/>
        </Link>
      </div>
      <div className="py-4">
        <NavItem href='/'>
          <CircleGauge />
          <span>Dashboard</span>
        </NavItem>
      </div>
    </aside>
  )
}
