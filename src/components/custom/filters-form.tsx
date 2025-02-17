'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { useCreateQueryString } from '@/hooks/use-create-query-string';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';

type FilterValue = {
  label: string;
  value: string;
};

type Filter = {
  key: string;
  label: string;
  placeholder: string;
  values: FilterValue[];
};

type SelectedFilters = {
  [K in Filter['key']]?: string;
};

type FiltersFormProps = {
  filters: Filter[];
};

const FiltersForm = ({ filters: FILTERS }: FiltersFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { createQueryString, removeParams } = useCreateQueryString();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    () => {
      return FILTERS.reduce((acc, filter) => {
        acc[filter.key] = searchParams.get(filter.key) || 'any';
        return acc;
      }, {} as SelectedFilters);
    }
  );

  const handleApplyFilters = () => {
    setIsLoading(true);

    const validFilters = Object.entries(selectedFilters).reduce<
      Record<string, string>
    >((acc, [key, value]) => {
      if (value && value !== 'any') {
        acc[key] = value;
      }
      return acc;
    }, {});

    const queryString = createQueryString(validFilters);

    const newUrl = `${pathname}${queryString}`;
    if (
      newUrl ===
      `${pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ''
      }`
    ) {
      setIsLoading(false);
      return;
    }

    router.push(newUrl);
  };

  const handleResetFilters = () => {
    setIsResetting(true);

    setSelectedFilters(
      FILTERS.reduce((acc, filter) => {
        acc[filter.key] = 'any';
        return acc;
      }, {} as SelectedFilters)
    );

    if (!Array.from(searchParams.keys()).length) {
      setIsResetting(false);
      return;
    }

    const queryString = removeParams(FILTERS.map(filter => filter.key));
    router.push(`${pathname}${queryString}`);
  };

  useEffect(() => {
    setIsLoading(false);
    setIsResetting(false);
  }, [searchParams]);

  return (
    <div className='space-y-4'>
      <h3 className='text-sm font-semibold'>Filter & Sort</h3>
      <ul>
        {FILTERS.map(({ key, label, placeholder, values }) => (
          <li key={label} className='mb-2 px-0.5'>
            <Label>{label}</Label>
            <Select
              defaultValue='any'
              value={selectedFilters[key] ? selectedFilters[key] : 'any'}
              onValueChange={val =>
                setSelectedFilters(prev => {
                  return { ...prev, [key]: val };
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='any'>Any</SelectItem>
                {values.map(val => (
                  <SelectItem key={val.value} value={val.value}>
                    {val.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </li>
        ))}
      </ul>
      <div className='flex items-center space-x-2.5'>
        <Button
          size='sm'
          onClick={handleApplyFilters}
          disabled={isLoading || isResetting}
        >
          {isLoading && <Loader2 className='size-4 animate-spin' />}
          Apply
        </Button>
        <Button
          size='sm'
          variant='outline'
          onClick={handleResetFilters}
          disabled={isLoading || isResetting}
        >
          {isResetting && <Loader2 className='size-4 animate-spin' />}
          Reset all
        </Button>
      </div>
    </div>
  );
};

export default FiltersForm;
