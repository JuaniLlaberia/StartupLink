import Link from 'next/link';
import { Infinity } from 'lucide-react';

const Logo = () => {
  return (
    <Link href='/' className='flex items-center gap-2.5'>
      <div className='bg-violet-500 p-1.5 rounded-lg text-white'>
        <Infinity className='size-6' strokeWidth={2.25} />
      </div>
      <h1 className='font-bold text-xl hidden md:block'>StartupLink</h1>
    </Link>
  );
};

export default Logo;
