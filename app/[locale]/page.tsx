import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WaitlistCTA } from '@/components/sections/WaitlistCTA';
import { FAQSection } from '@/components/sections/FAQSection';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }, { locale: 'fr' }];
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <PricingSection />
      <TestimonialsSection />
      <WaitlistCTA />
      <FAQSection />
    </main>
  );
}
