'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '../ui/button';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages === 0) return;

  return (
    <div className='flex items-center justify-end gap-2.5 py-5'>
      <Button
        size='sm'
        variant='ghost'
        disabled={currentPage === 1}
        onClick={() => createPageURL(currentPage - 1)}
      >
        <ChevronLeft /> Previous
      </Button>
      <Button
        size='sm'
        variant='ghost'
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => createPageURL(currentPage + 1)}
      >
        Next <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
