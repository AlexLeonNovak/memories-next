'use client';
import {FormEvent, useEffect, useState} from 'react';
import {useAuth} from '@/hooks';
import {useRouter} from 'next/navigation';
import {getFirebaseAuth} from '@/services';
import {getRedirectResult} from 'firebase/auth';
import Image from 'next/image';
import {Button, Input, Label} from '@/components';
import {LogIn} from 'lucide-react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const router = useRouter();

  const handleLoginWithRedirect = async () => {
    const auth = getFirebaseAuth();
    const credential = await getRedirectResult(auth);
    console.log(credential);
    if (credential?.user) {
      router.push('/admin');
    }
  }

  useEffect(() => {
    handleLoginWithRedirect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result) {
      router.push('/admin');
    }
  }

  return (
    <div className="p-6 bg-white border rounded">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image className="mx-auto h-10 w-auto" src="/logo.svg" alt="Zberezhemo logo" width={175} priority height={37}/>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="login">Email</Label>
            <div className="mt-2">
              <Input name="email"
                     placeholder="Email"
                     type="email"
                     required
                     onChange={e => setEmail(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="mt-2">
              <Input name="password"
                     placeholder="Password"
                     type="password"
                     required
                     onChange={e => setPassword(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            { error && <span className="text-red-600">{error}</span>}
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
