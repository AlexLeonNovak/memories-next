import Link from 'next/link';
import {NavItem} from '.';
import {CircleGauge} from 'lucide-react';


export const Sidebar = () => {
  return (
    <aside className="border-r bg-gray-50">
      <div className="flex h-[60px] items-center justify-center border-b">
        <Link href="/" className="text-3xl">
          Memories
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
