import StartupProfileForm from './(components)/startup-profile-form';
import { getStartup } from '@/access-data/startup/get-startup';

const InformationPage = async ({
  params,
}: {
  params: Promise<{ startupId: string }>;
}) => {
  const { startupId } = await params;
  const startup = await getStartup({ startupId });

  return (
    <section>
      <StartupProfileForm startup={startup} />
    </section>
  );
};

export default InformationPage;
