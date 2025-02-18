import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import {
  AtSign,
  Building,
  Calendar,
  Calendar1,
  ChevronRight,
  CircleHelp,
  Coins,
  Globe,
  List,
  ListFilterPlus,
  MapPin,
  Tag,
  ThumbsUp,
  User,
  Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const MAIN_FEATURES = [
  {
    label: 'Startups, People & Questions',
    description:
      'Discover startups, connect with co-founders, and answer key questions to refine your ideas and find the right opportunities.',
    content: (
      <div className='h-52 w-full flex items-center justify-center'>
        <div className='relative mt-6'>
          <div className='transform transition-all duration-300 ease-in-out'>
            <div className='bg-background flex items-center gap-5 rounded-lg border border-border p-3 w-56 transition-all duration-300 ease-in-out'>
              <div className='bg-violet-500 p-2 rounded-lg text-secondary'>
                <Building className='size-5' strokeWidth={1.5} />
              </div>
              <p className='font-semibold text-sm'>Browse startups</p>
            </div>
            <div className='bg-background flex items-center gap-5 rounded-lg border border-border p-3 w-56 transform translate-x-8 -translate-y-2 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-2'>
              <div className='bg-violet-500 p-2 rounded-lg text-secondary'>
                <Users className='size-5' />
              </div>
              <p className='font-semibold text-sm'>Browse co-founders</p>
            </div>
            <div className='bg-background flex items-center gap-5 rounded-lg border border-border p-3 w-56 transform translate-x-16 -translate-y-4 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-4'>
              <div className='bg-violet-500 p-2 rounded-lg text-secondary'>
                <CircleHelp className='size-5' />
              </div>
              <p className='font-semibold text-sm'>Browse questions</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Custom Landing Pages for Startups',
    description:
      'Create a personalized landing page for your startup to showcase your vision, attract talent, and connect with potential co-founders and investors.',
    content: (
      <div className='h-52 w-full flex items-center justify-center'>
        <div className='w-80 h-48 mt-6 bg-white rounded-lg shadow-md group-hover:shadow-lg overflow-hidden flex group'>
          <div className='flex-1 p-4 group-hover:bg-violet-200 transition-all duration-300'>
            <div className='size-16 bg-gray-100 rounded mb-4' />

            <div className='space-y-3'>
              <div className='w-full h-3 bg-gray-100 rounded' />
              <div className='w-4/5 h-3 bg-gray-100 rounded' />
              <div className='w-3/4 h-3 bg-gray-100 rounded' />
            </div>
          </div>

          <div className='w-8 relative overflow-hidden'>
            <div className='absolute inset-0 flex flex-col group-hover:opacity-0 transition-opacity duration-300'>
              <div className='h-1/3 bg-rose-400' />
              <div className='h-1/3 bg-emerald-400' />
              <div className='h-1/3 bg-violet-400' />
            </div>

            <div className='absolute inset-0 bg-violet-400 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-start hover:w-14'>
              <div className='w-1.5 h-8 bg-white rounded-full opacity-0 group-hover:opacity-100 ml-3 transition-all duration-500' />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Apply to Startup Roles',
    description:
      'Browse startup teams looking for talent and apply for roles that match your skills, whether as a co-founder or a key team member.',
    content: (
      <div className='h-52 w-full flex items-center justify-center'>
        <div className='w-72 bg-white rounded-lg border border-border shadow overflow-hidden transition-all duration-400 mt-4 hover:shadow-lg group'>
          <div className='p-2.5'>
            <div className='flex items-center gap-1.5 mb-2.5'>
              <div className='bg-green-500 rounded-full size-2 animate-pulse' />
              <p className='text-xs text-green-500'>New application received</p>
            </div>
            <div className='flex items-center space-x-4'>
              <img
                src='/user-image-1.avif'
                className='size-12 object-cover rounded-lg'
              />
              <div>
                <h3 className='text-sm font-medium text-gray-900'>John Doe</h3>
                <p className='text-sm text-gray-500'>Software Engineer</p>
              </div>
            </div>
          </div>

          {/* Expanded Content - Visible on Hover */}
          <div className='max-h-0 overflow-hidden transition-all duration-400 ease-in-out group-hover:max-h-64'>
            <div className='p-2.5 pt-0'>
              <div>
                <p className='flex items-center gap-1.5 text-sm text-gray-600'>
                  <AtSign className='size-3' /> john.doe@example.com
                </p>
                <p className='flex items-center gap-1.5 text-sm text-gray-600'>
                  <Calendar className='size-3' /> 5 years of experience
                </p>
                <p className='flex items-center gap-1.5 text-sm text-gray-600'>
                  <MapPin className='size-3' /> San Francisco, CA
                </p>
              </div>

              <div className='w-full mt-3 flex space-x-2'>
                <Button
                  size='sm'
                  className='w-full bg-green-400 hover:bg-green-500 active:bg-green-500'
                >
                  Accept
                </Button>
                <Button size='sm' variant='destructive' className='w-full'>
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const EXTRA_FEATURES = [
  {
    label: 'Members Surveys',
    icon: List,
    description:
      'Get valuable insights from community members through targeted surveys and polls',
  },
  {
    label: 'Private Events',
    icon: Calendar1,
    description:
      'Exclusive access to member-only events, workshops, and networking opportunities',
  },
  {
    label: 'Startup Roles',
    icon: Tag,
    description:
      'Browse and apply to curated job opportunities in innovative startups',
  },
  {
    label: 'Browse & Discovery',
    icon: Globe,
    description:
      'Explore and connect with startups and entrepreneurs from around the world',
  },
  {
    label: 'Upvotes by Users',
    icon: ThumbsUp,
    description:
      'Community-driven content ranking to highlight the most valuable resources',
  },
  {
    label: 'Custom Profile',
    icon: User,
    description:
      'Create your unique digital presence with customizable profile features',
  },
  {
    label: 'Advanced filtering',
    icon: ListFilterPlus,
    description:
      'Find exactly what you need with powerful search and filtering options',
  },
  {
    label: 'Free for Everyone',
    icon: Coins,
    description:
      'Access all core features without any cost - our community is open to all',
  },
];

const Features = () => {
  return (
    <div className='relative w-full flex flex-col items-center justify-center py-16'>
      <div className='flex items-center justify-center flex-col gap-2'>
        <h4 className='text-5xl font-semibold text-center'>Our features</h4>
        <p className='text-xl font-medium text-center text-muted-foreground max-w-lg'>
          Discover a variety of our advanced features. Unlimited and free for
          individuals.
        </p>
        <Link href='/startups' className={cn(buttonVariants({}), 'group mt-3')}>
          Get started now
          <ChevronRight className='group-hover:translate-x-1 transition-transform' />
        </Link>
      </div>
      <div className='w-full max-w-7xl my-16'>
        <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4'>
          {MAIN_FEATURES.map(({ label, description, content }, i) => (
            <li
              key={i}
              className='z-50 flex flex-col justify-center border border-border rounded-lg bg-muted/50 p-8 shadow group hover:cursor-pointer'
            >
              <h6 className='font-semibold text-lg mb-3'>{label}</h6>
              <p className='text-muted-foreground text-sm'>{description}</p>
              {content}
            </li>
          ))}
        </ul>
      </div>

      <h5 className='text-5xl font-semibold text-center'>
        ...And so much more!
      </h5>
      <div className='w-full max-w-2xl mt-12'>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {EXTRA_FEATURES.map(({ label, icon: Icon, description }, i) => (
            <li
              key={i}
              className='relative z-50 flex flex-col items-center size-40 bg-muted/50 border border-border rounded-lg p-8 shadow group hover:cursor-pointer'
            >
              {/* Original content */}
              <div className='bg-primary rounded-xl p-3 shadow'>
                <Icon className='size-6 text-secondary' />
              </div>
              <p className='text-center font-semibold mt-4 break-words w-full'>
                {label}
              </p>

              {/* Hover overlay */}
              <div className='absolute inset-0 bg-background rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4'>
                <p className='text-primary font-medium text-sm text-center'>
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px),radial-gradient(1200px_at_50%_50%,rgba(255,255,255,0)_0%,white_100%)] bg-[size:6rem_4rem,6rem_4rem,auto] [mask-image:radial-gradient(ellipse_60%_90%_at_90%_5%,#000_70%,transparent_110%)]'></div>
    </div>
  );
};

export default Features;
