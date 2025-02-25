import DesignForm from './(components)/design-form';
import { getStartup } from '@/access-data/startup/get-startup';
import { getDesignConfig } from '@/access-data/design/get-design-config';

const DesignPagea = async ({
  params,
}: {
  params: Promise<{ startupId: string }>;
}) => {
  const { startupId } = await params;

  const [startup, designConfig] = await Promise.all([
    getStartup({ startupId }),
    getDesignConfig({ startupId }),
  ]);

  return (
    <section>
      <header className='space-y-1 mb-2'>
        <h1 className='text-lg font-medium'>Design</h1>
        <p className='text-sm text-muted-foreground'>
          Create a custom startup landing page to showcase your vision to the
          world.
        </p>
      </header>
      <DesignForm
        startupId={startupId}
        startupData={startup}
        designConfig={designConfig}
      />
    </section>
  );
};

export default DesignPagea;
