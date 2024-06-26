import {Button, Input, Label} from '@/components';
import Image from 'next/image';
import {LogIn} from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="p-6 bg-white border rounded">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image className="mx-auto h-10 w-auto" src="/logo.svg" alt="Zberezhemo logo" width={175} priority height={37}/>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-5">
          <div>
            <Label htmlFor="login">Login</Label>
            <div className="mt-2">
              <Input name="login" placeholder="Login"/>
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="mt-2">
              <Input name="password" placeholder="Password"/>
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="flex gap-2" type="submit">
              <LogIn />
              <span>Sign in</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
