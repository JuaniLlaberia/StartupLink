'use client';

import Link from 'next/link';
import { Loader2, Plus, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useCreateQueryString } from '@/hooks/use-create-query-string';

const SearcStartupshHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useCreateQueryString();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleQueryString = (name: string, value: string) => {
    const queryString = createQueryString({ [name]: value });
    router.push(`${pathname}${queryString}`);

    setIsLoading(true);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    handleQueryString('search', term);
  }, 300);

  const searchValue = searchParams.get('search');
  const sortBy = searchParams.get('sortBy');

  useEffect(() => {
    setIsLoading(false);
  }, [sortBy, searchValue]);

  return (
    <header className='space-y-2.5'>
      <h1 className='font-medium'>Your startups</h1>
      <div className='w-full flex flex-col md:flex-row gap-2.5'>
        <div className='relative w-full'>
          <Input
            className='w-full pl-10 pr-20'
            placeholder='Search for your startup...'
            disabled={isLoading}
            defaultValue={searchValue ?? ''}
            onChange={e => handleSearch(e.target.value)}
          />
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground'>
            {isLoading ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <Search className='size-4' />
            )}
          </div>
        </div>
        <div className='flex items-center gap-2.5'>
          <Select
            disabled={isLoading}
            defaultValue='name'
            onValueChange={val => {
              handleQueryString('sortBy', val);
            }}
          >
            <SelectTrigger className='w-full md:max-w-[175px]'>
              <SelectValue placeholder='Select sort' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='name'>Sort by name</SelectItem>
              <SelectItem value='creation'>Sort by creation</SelectItem>
            </SelectContent>
          </Select>
          <Link
            href='/startups/new'
            className={cn(buttonVariants({}), 'text-xs')}
          >
            <Plus className='size-4' />
            <span className='md:hidden'>New</span>
            <span className='hidden md:block'>Create startup</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SearcStartupshHeader;
