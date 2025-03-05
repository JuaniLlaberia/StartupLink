import { cn } from '@/lib/utils';
import { Marquee } from '../magicui/marquee';

const testimonials = [
  {
    name: 'Sophia Martinez',
    body: 'StartupLink made it so easy to find the perfect co-founder. Highly recommend!',
  },
  {
    name: 'James Carter',
    body: 'I struggled to launch my startup until I found this platform. Now, we’re thriving!',
  },
  {
    name: 'Emily Chen',
    body: "Thanks to StartupLink, I built an amazing team and we're seeing real progress!",
  },
  {
    name: 'Daniel Lee',
    body: 'I validated my startup idea and connected with amazing entrepreneurs here.',
  },
  {
    name: 'Olivia Brown',
    body: 'I found a great startup to join and an incredible team to work with!',
  },
  {
    name: 'Michael Johnson',
    body: 'This platform is a game-changer for finding co-founders and growing startups.',
  },
  {
    name: 'Ava Patel',
    body: 'StartupLink helped me connect with the right people to bring my idea to life.',
  },
  {
    name: 'Liam Thompson',
    body: 'From networking to team building, this platform has everything a startup needs!',
  },
];
const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

const TestimonialCard = ({ name, body }: { name: string; body: string }) => {
  return (
    <figure
      className={cn(
        'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border border-border p-4 bg-muted/40 hover:bg-muted/85'
      )}
    >
      <div className='flex flex-row items-center gap-2'>
        <div className='flex items-center justify-center size-8 border border-border rounded-lg bg-violet-500 text-white'>
          {name.charAt(0)}
        </div>
        <div className='flex flex-col'>
          <figcaption className='text-sm font-medium dark:text-white'>
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className='mt-2 text-sm'>{body}</blockquote>
    </figure>
  );
};

const Testimonials = () => {
  return (
    <div className='space-y-8 py-16'>
      <div className='flex flex-col items-center justify-center gap-2.5'>
        <h4 className='text-4xl font-semibold'>
          What{' '}
          <span className='text-violet-500 bg-violet-200/60 rounded-lg'>
            people
          </span>{' '}
          are saying
        </h4>
        <p className='text-lg text-muted-foreground font-medium text-center max-w-lg'>
          We are very proud of the service we provide and stand by every product
          we carry. Read our testimonials from our happy customers.
        </p>
      </div>
      <div className='relative flex w-full flex-col items-center justify-center overflow-hidden'>
        <Marquee pauseOnHover className='[--duration:20s]'>
          {firstRow.map(review => (
            <TestimonialCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className='[--duration:20s]'>
          {secondRow.map(review => (
            <TestimonialCard key={review.name} {...review} />
          ))}
        </Marquee>
        <div className='pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background'></div>
        <div className='pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background'></div>
      </div>
    </div>
  );
};

export default Testimonials;
