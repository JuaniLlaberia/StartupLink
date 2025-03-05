import SurveyForm from './(components)/survey-form';

const NewSurveyPage = async ({
  params,
}: {
  params: Promise<{ startupId: string }>;
}) => {
  const { startupId } = await params;

  return (
    <section>
      <SurveyForm startupId={startupId} />
    </section>
  );
};

export default NewSurveyPage;
