'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  Building,
  Calendar1,
  Check,
  CircleHelp,
  Search,
  User,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useCreateQueryString } from '@/hooks/use-create-query-string';

const SEARCH_TYPES = [
  { label: 'Search Startups', type: 'startups', icon: Building },
  { label: 'Search People', type: 'people', icon: User },
  { label: 'Search Forum Questions', type: 'questions', icon: CircleHelp },
  { label: 'Search Events', type: 'events', icon: Calendar1 },
];

const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('startups');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createQueryString } = useCreateQueryString();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    router.push(
      `/${selectedType}${createQueryString({ search: searchQuery })}`
    );
    setIsOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          ref={buttonRef}
          className='hidden md:inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-primary px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/40 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-36 lg:w-52 xl:w-60'
        >
          <span className='hidden lg:inline-flex'>Search here...</span>
          <span className='inline-flex lg:hidden'>Search...</span>
          <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
            <span className='text-[0.6rem]'>⌘</span>Enter
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogTrigger asChild>
        <Button size='icon' variant='outline' className='md:hidden'>
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className='p-4' withCloseButton={false}>
        <DialogHeader className='hidden'>
          <DialogTitle />
        </DialogHeader>
        <form onSubmit={handleSearch}>
          <div className='relative w-full'>
            <Input
              placeholder={`Search ${selectedType}...`}
              className='w-full pl-10 pr-20'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery.length > 0 && (
              <kbd className='absolute inset-y-0 right-1.5 pl-3 my-1.5 flex items-center pointer-events-none select-none gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
                Enter ↵
              </kbd>
            )}
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='size-4 text-muted-foreground' />
            </div>
          </div>
        </form>
        <div>
          <h4 className='text-sm font-medium'>Select search type</h4>
          <ul className='space-y-0.5 py-2'>
            {SEARCH_TYPES.map(({ label, type, icon: Icon }) => (
              <li
                key={type}
                onClick={() => setSelectedType(type)}
                className={cn(
                  'flex items-center justify-between py-1.5 px-2 pl-4 text-sm text-muted-foreground rounded-lg transition-colors hover:cursor-pointer',
                  selectedType === type
                    ? 'text-primary bg-muted'
                    : 'hover:text-primary hover:bg-muted'
                )}
              >
                <span className='flex items-center gap-1.5'>
                  <Icon className='size-4' />
                  {label}
                </span>
                {selectedType === type && (
                  <span>
                    <Check className='size-4 text-muted-foreground' />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          {Boolean(searchParams.get('search')) && (
            <Button
              variant='ghost'
              size='sm'
              className='text-muted-foreground'
              onClick={() => {
                router.push(pathname + createQueryString({ search: '' }));
                setIsOpen(false);
              }}
            >
              Clear search
            </Button>
          )}
          <DialogClose asChild>
            <Button variant='outline' size='sm'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
