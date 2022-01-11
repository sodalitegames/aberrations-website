import { NextSeo } from 'next-seo';

import { attributes as global } from '../../content/settings/global.md';

const Seo = ({ metadata }) => {
  const { siteTitle } = global;

  // Prevent errors if no metadata was set
  if (!metadata) return null;

  return (
    <NextSeo
      title={metadata.title}
      description={metadata.description}
      openGraph={{
        // Title and description are mandatory
        title: `${metadata.title} | ${siteTitle}`,
        description: metadata.description,
        // Only include OG image if it exists
        ...(metadata.shareImage && {
          images: [
            {
              url: metadata.shareImage.url,
            },
          ],
        }),
      }}
      // Only include Twitter data if it exists
      twitter={{
        ...(metadata.twitterCardType && { cardType: metadata.twitterCardType }),
        // Handle is the twitter username of the content creator
        ...(metadata.twitterUsername && { handle: metadata.twitterUsername }),
      }}
    />
  );
};

export default Seo;
