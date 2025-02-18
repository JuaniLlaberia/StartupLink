const Phrase = () => {
  return (
    <div className='w-full flex items-center justify-center py-20'>
      <p className='text-4xl font-bold text-center max-w-4xl'>
        Great{' '}
        <span className='text-violet-500 p-1 bg-violet-200/60 rounded-lg'>
          startups
        </span>{' '}
        are built on great connections. Find co-founders, team members, and
        like-minded entrepreneurs to{' '}
        <span className='text-violet-500 p-1 bg-violet-200/60 rounded-lg'>
          bring your vision to life.
        </span>
      </p>
    </div>
  );
};

export default Phrase;
