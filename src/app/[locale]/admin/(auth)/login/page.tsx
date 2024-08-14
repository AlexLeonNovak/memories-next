import { LoginForm } from '@/components/screens';
import { redirect } from '@/navigation';
import { getUser } from '@/server/actions/auth.actions';

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    return redirect('/admin');
  }
  return <LoginForm />;
}
