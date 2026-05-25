import { LoginForm } from './LoginForm';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }, { locale: 'fr' }];
}

export default function LoginPage() {
  return <LoginForm />;
}
