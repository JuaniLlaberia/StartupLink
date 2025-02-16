import StartupForm from './(components)/startup-form';

const NewStartupPage = () => {
  return (
    <section className='p-1 py-8'>
      <div className='min-h-[75dvh] flex items-center justify-center'>
        <StartupForm />
      </div>
    </section>
  );
};

export default NewStartupPage;
