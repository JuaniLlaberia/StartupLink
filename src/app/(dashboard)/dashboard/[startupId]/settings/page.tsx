import StartupSettings from './(components)/startup-settings';

const SettingsPage = async ({
  params,
}: {
  params: Promise<{ startupId: string }>;
}) => {
  const { startupId } = await params;

  return (
    <section>
      <h1 className='text-lg font-medium mb-2'>Startup settings</h1>
      <StartupSettings startupId={startupId} />
    </section>
  );
};

export default SettingsPage;
