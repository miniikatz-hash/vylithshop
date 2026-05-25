import { DemoForm } from './DemoForm';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }, { locale: 'fr' }];
}

export default function DemoPage() {
  return <DemoForm />;
}
