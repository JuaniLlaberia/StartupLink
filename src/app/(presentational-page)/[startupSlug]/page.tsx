import Image from 'next/image';
import Link from 'next/link';
import {
  Atom,
  Building,
  Code2,
  ExternalLink,
  Globe,
  MapPin,
  Tag,
  ThumbsUp,
  Users,
  Verified,
} from 'lucide-react';

import { getStartupBySlug } from '@/access-data/startup/get-startup-by-slug';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { INDUSTRY_LABELS, STAGE_LABELS, TEAM_SIZE_LABELS } from '@/lib/labels';
import { Separator } from '@/components/ui/separator';
import RoleApplicationBtn from '@/components/custom/role-application-btn';

const StartupPresentationPage = async ({
  params,
}: {
  params: Promise<{ startupSlug: string }>;
}) => {
  const { startupSlug } = await params;
  const startup = await getStartupBySlug({ startupSlug });

  const {
    id: startupId,
    name,
    location,
    verified,
    stage,
    industry,
    teamSize,
    image,
    coverImage,
    mission,
    website,
    roles,
    createdAt,
    skills,
    members,
    designConfig,
    upvotesCount,
  } = startup;

  const {
    mainBackground,
    secondaryBackground,
    mainText,
    secondaryText,
    borderRadius,
  } = designConfig;

  const fullPageStyle = {
    backgroundColor: mainBackground || 'transparent',
    minHeight: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    margin: 0,
    padding: 0,
  } as React.CSSProperties;

  const contentStyle = {
    color: mainText || 'inherit',
    position: 'relative',
  } as React.CSSProperties;

  const cssVars = {
    '--border-radius': borderRadius ? `${borderRadius}px` : '0.5rem',
    '--secondary-bg': secondaryBackground || 'inherit',
    '--secondary-text': mainText || 'inherit',
  } as React.CSSProperties;

  const badgeClass = `flex items-center gap-1.5 px-3 py-1.5 ${
    secondaryBackground ? 'bg-[var(--secondary-bg)]' : ''
  } ${secondaryText ? 'text-[var(--secondary-text)]' : ''}`;
  const cardClass = `rounded-[var(--border-radius)] ${
    secondaryBackground ? 'bg-[var(--secondary-bg)]' : 'bg-secondary'
  }`;

  return (
    <>
      {/* Full page background div */}
      <div style={fullPageStyle} />

      {/* Content section */}
      <section
        className='max-w-4xl mx-auto p-3'
        style={{ ...contentStyle, ...cssVars }}
      >
        {/* Cover image */}
        <div
          className='relative h-48 lg:h-52 w-full overflow-hidden'
          style={{ borderRadius: `var(--border-radius)` }}
        >
          {coverImage ? (
            <div
              className='w-full h-full overflow-hidden'
              style={{ borderRadius: `var(--border-radius)` }}
            >
              <Image
                src={coverImage}
                alt='cover image'
                fill
                className='object-cover'
                style={{ borderRadius: `var(--border-radius)` }}
                placeholder='blur'
                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIB4gHh4gIB4dHR0eHh0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
                priority
              />
            </div>
          ) : (
            <div
              className='w-full h-full bg-gradient-to-r from-purple-500 to-pink-300'
              style={{ borderRadius: `var(--border-radius)` }}
            />
          )}

          {upvotesCount > 0 && (
            <div className='absolute top-4 right-4 z-10'>
              <div
                className={`flex items-center gap-1.5 p-1.5 px-3 ${cardClass}`}
              >
                <ThumbsUp className='w-4 h-4' />
                <span className='font-medium'>{upvotesCount}</span>
              </div>
            </div>
          )}
        </div>
        {/* Main image */}
        <div className='relative mx-auto -mt-16 md:-mt-20 w-32 h-32 md:w-40 md:h-40'>
          <Avatar
            className='size-40 border shadow-lg'
            style={{
              borderColor: secondaryBackground || 'var(--border)',
              borderRadius: `calc(var(--border-radius) * 2)`,
            }}
          >
            <AvatarImage src={image ?? undefined} alt={name ?? 'Profile'} />
            <AvatarFallback
              className='text-3xl'
              style={{ borderRadius: `calc(var(--border-radius) * 2)` }}
            >
              {name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        {/* Header */}
        <header className='text-center px-4 md:px-8 mt-8'>
          <h1
            className='text-3xl md:text-4xl font-semibold mb-2 flex justify-center items-center gap-2.5'
            style={{ color: mainText || 'inherit' }}
          >
            {name}{' '}
            <span>
              {verified && (
                <Verified className='stroke-blue-500 fill-blue-50' />
              )}
            </span>
          </h1>
          <p
            className='text-lg mb-6 max-w-2xl mx-auto'
            style={{ color: secondaryText || 'var(--muted-foreground)' }}
          >
            {mission}
          </p>
          <div className='flex flex-wrap justify-center gap-3 mb-8'>
            <Badge variant='secondary' className={badgeClass}>
              <Building
                className='size-4'
                style={{ color: secondaryText || 'var(--muted-foreground)' }}
              />
              {INDUSTRY_LABELS[industry]}
            </Badge>
            <Badge variant='secondary' className={badgeClass}>
              <Tag
                className='size-4'
                style={{ color: secondaryText || 'var(--muted-foreground)' }}
              />
              {STAGE_LABELS[stage]}
            </Badge>
            <Badge variant='secondary' className={badgeClass}>
              <MapPin
                className='size-4'
                style={{ color: secondaryText || 'var(--muted-foreground)' }}
              />
              {location}
            </Badge>
            <Badge variant='secondary' className={badgeClass}>
              <Users
                className='size-4'
                style={{ color: secondaryText || 'var(--muted-foreground)' }}
              />
              {TEAM_SIZE_LABELS[teamSize]} team members
            </Badge>
            <Badge variant='secondary' className={badgeClass}>
              <Globe
                className='size-4'
                style={{ color: secondaryText || 'var(--muted-foreground)' }}
              />
              Founded in {new Date(createdAt).getFullYear()}
            </Badge>
          </div>
        </header>
        <Separator className='my-10' />
        {/* Team members */}
        <div className='px-4 md:px-8'>
          <h2
            className='text-3xl font-semibold mb-6'
            style={{ color: mainText || 'inherit' }}
          >
            Our Team
          </h2>
          <ul className='flex flex-wrap gap-4 lg:gap-8'>
            {members.map(member => (
              <li
                key={member.name}
                className='flex flex-col items-center justify-center gap-2'
              >
                <Avatar
                  className='size-32 border'
                  style={{
                    borderColor: secondaryBackground || 'var(--border)',
                    borderRadius: `calc(var(--border-radius) * 1.5)`,
                  }}
                >
                  <AvatarFallback
                    style={{
                      borderRadius: `calc(var(--border-radius) * 1.5)`,
                    }}
                  >
                    {member.name?.charAt(0)}
                  </AvatarFallback>
                  <AvatarImage
                    src={member.image || undefined}
                    alt={member.name || 'Profile photo'}
                  />
                </Avatar>
                <div className='text-center space-y-0.5'>
                  <p
                    className='font-medium'
                    style={{ color: mainText || 'inherit' }}
                  >
                    {member.name}
                  </p>
                  <Badge
                    variant='secondary'
                    className='text-violet-500 bg-violet-200/60 hover:bg-violet-200/60'
                    style={{ borderRadius: `var(--border-radius)` }}
                  >
                    {member.role}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Separator className='my-10' />
        {/* Tech stack */}
        <div className='px-4 md:px-8 space-y-10'>
          <h2
            className='text-3xl font-semibold mb-3 flex items-center gap-2'
            style={{ color: mainText || 'inherit' }}
          >
            Technologies we use...
          </h2>
          <ul className='flex flex-wrap gap-2'>
            {skills.map(tech => (
              // <li key={tech}></li>
              <Badge
                key={tech}
                variant='secondary'
                className='px-4 py-1.5 flex items-center gap-2.5 text-sm font-medium'
                style={{
                  backgroundColor: secondaryBackground || '',
                  color: mainText || '',
                  borderRadius: `var(--border-radius)`,
                }}
              >
                <Code2 className='size-5 text-muted-foreground' />
                {tech}
              </Badge>
            ))}
          </ul>
        </div>
        <Separator className='my-10' />
        {/* Available roles */}
        <div className='px-4 md:px-8 space-y-10'>
          <h2
            className='text-3xl font-semibold mb-3 flex items-center gap-2'
            style={{ color: mainText || 'inherit' }}
          >
            Open roles ({roles.length})
          </h2>
          <ul className='w-full space-y-2.5'>
            {roles.map(role => (
              <li
                key={role.id}
                className='flex items-center justify-between w-full bg-muted/50 border border-border rounded-lg p-4 shadow'
              >
                <div className='flex items-center gap-5'>
                  <Avatar className='size-12'>
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    <AvatarImage src={image ?? undefined} />
                  </Avatar>
                  <div>
                    <h6 className='font-semibold'>{role.name}</h6>
                    <p className='text-muted-foreground text-sm'>
                      {role.description}
                    </p>
                  </div>
                </div>
                <RoleApplicationBtn
                  startupId={startupId}
                  roleId={role.id}
                  requiresSurvey={role.requiresSurvey}
                  surveyId={role.surveyId ?? undefined}
                />
              </li>
            ))}
          </ul>
        </div>
        <Separator className='my-10' />
        {/* Footer (link and powered tag) */}
        <footer className='p-8 pb-2 flex flex-col items-center justify-center gap-3'>
          {website && (
            <div>
              <Link
                href={website}
                target='_blank'
                className={buttonVariants({ size: 'lg', variant: 'link' })}
                style={{
                  color: mainText || '',
                }}
              >
                Visit website <ExternalLink />
              </Link>
            </div>
          )}

          <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
            <Atom className='mr-1.5 size-4 transition-transform duration-300 ease-in-out' />
            <span>
              Powered by{' '}
              <Link href='/' className='hover:underline hover:cursor-pointer'>
                StartupLink
              </Link>
            </span>
          </AnimatedShinyText>
        </footer>
      </section>
    </>
  );
};

export default StartupPresentationPage;
