import CallToAction from '@/components/landing-page/call-to-action';
import Faq from '@/components/landing-page/faq';
import Features from '@/components/landing-page/features';
import Hero from '@/components/landing-page/hero';
import Phrase from '@/components/landing-page/phrase';

const LandingPage = () => {
  return (
    <div className='p-1 py-8 space-y-16'>
      <Hero />
      <Features />
      <Phrase />
      <Faq />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
