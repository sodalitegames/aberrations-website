import ErrorPage from 'next/error';

import PageLayout from '../layouts/PageLayout';

import MarkdownContent from '../components/sections/markdown-content';

import EmailCTA from '../components/elements/email-cta';

import { parseDateShort } from '../utils/functions/parse-date';

const BetaChangeLog = ({ changeLogs, metadata }) => {
  // Check if the required data was provided
  if (!changeLogs) {
    return <ErrorPage statusCode={500} />;
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} breadcrumbs={[{ name: metadata.title, href: `/${metadata.slug}` }]}>
      <ul>
        {changeLogs.map(({ date, betaVersion, log, emailNotificationSent }, index) => (
          <div key={index}>
            {index === 0 ? (
              <>
                <div className="pb-2">
                  <h2 className="heading">
                    {parseDateShort(date)} - Version: Beta-{betaVersion}
                  </h2>
                  <p>Notified: {emailNotificationSent ? 'Yes' : 'No'}</p>
                  <MarkdownContent data={{ content: log }} />
                </div>
                <EmailCTA ctaText="Have change log updates sent straight to your email, so you never have to worry about missing anything." buttonText="Keep me in the loop" />
              </>
            ) : (
              <div className="border-b dark:border-gray-800 py-6">
                <h2 className="heading">
                  {parseDateShort(date)} - Version: Beta-{betaVersion}
                </h2>
                <p>Notified: {emailNotificationSent ? 'Yes' : 'No'}</p>
                <MarkdownContent data={{ content: log }} />
              </div>
            )}
          </div>
        ))}
      </ul>
    </PageLayout>
  );
};

export async function getStaticProps() {
  const page = await import('../content/pages/beta-change-log.md').catch(error => null);
  const changeLog = await import('../content/rules/beta-change-log.md').catch(error => null);

  const { metadata } = page.attributes;
  const { changeLogs } = changeLog.attributes;

  // Sort change logs by date
  const sortedChangeLogs = changeLogs.sort((prev, curr) => new Date(curr.date) - new Date(prev.date));

  return {
    props: {
      changeLogs: sortedChangeLogs,
      metadata,
    },
  };
}

export default BetaChangeLog;
