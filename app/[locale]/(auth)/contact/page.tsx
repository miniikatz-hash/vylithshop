import { ContactForm } from './ContactForm';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }, { locale: 'fr' }];
}

export default function ContactPage() {
  return <ContactForm />;
}
