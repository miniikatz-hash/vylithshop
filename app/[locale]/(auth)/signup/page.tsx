import { SignupForm } from './SignupForm';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }, { locale: 'fr' }];
}

export default function SignupPage() {
  return <SignupForm />;
}
