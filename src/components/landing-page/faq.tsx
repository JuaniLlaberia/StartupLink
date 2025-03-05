import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const QUESTIONS = [
  {
    question: 'How can I list my startup on the platform?',
    answer:
      "Listing your startup is simple! Just create an account, fill out your startup's profile, and add key details like your industry, mission, and the roles you're looking to fill. It will automatically appear in the browsing section.",
  },
  {
    question: 'How does this platform help me find a co-founder?',
    answer:
      "Our platform makes it easy to find the right co-founder through browsing, filters, and powerful search tools. You can explore a wide range of startups and individuals based on industry, skills, location, etc. Whether you're looking for a co-founder, a business strategist, we help you connect with the right people efficiently.",
  },
  {
    question: 'Can I browse startups without creating an account?',
    answer:
      'Yes. There is no need to create an account to browse around. But if you want to create your own startup, join one or connect with startup/co-founders you will need one.',
  },
  {
    question: 'What industries or types of startups are listed here?',
    answer:
      "Our platform features a wide variety of startups across multiple industries. Whether you're interested in tech, finance, real estate, healthcare, entertainment, education, or e-commerce, you'll find startups from diverse sectors.",
  },
  {
    question: 'Is there a cost to join or list my startup?',
    answer:
      'No. Right now all of our features are free. We may add premium features in the future.',
  },
];

const Faq = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-7 gap-12 py-16'>
      <div className='col-span-3'>
        <h3 className='text-5xl font-semibold'>
          Common questions for the curious
        </h3>
      </div>
      <Accordion type='single' collapsible className='col-span-4 space-y-2.5'>
        {QUESTIONS.map(({ question, answer }, i) => (
          <AccordionItem key={i} value={`value-${i}`} className='text-lg'>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
