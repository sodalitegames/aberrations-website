import ErrorPage from 'next/error';
import { gql } from '@apollo/client';

import client from '../../../../../lib/apollo-client';

import { QUERY_SINGLE_WEAPON, QUERY_SINGLE_WEARABLE, QUERY_SINGLE_CONSUMABLE, QUERY_SINGLE_USABLE } from '../../../../../utils/queries/belonging-queries';
import { getSectionPropertySlugs } from '../../../../../utils/functions/get-section-property-slugs';
import { getWorldNavigation } from '../../../../../utils/functions/get-world-navigation';

import PageLayout from '../../../../../layouts/PageLayout';
import WorldPageLayout from '../../../../../layouts/WorldPageLayout';
import WeaponCard from '../../../../../components/elements/cards/weapon-card';
import WearableCard from '../../../../../components/elements/cards/wearable-card';
import ConsumableCard from '../../../../../components/elements/cards/consumable-card';
import UsableCard from '../../../../../components/elements/cards/usable-card';

const SingleBelonging = ({ belonging, belongingType, world, navigation, metadata }) => {
  // Check if the required data was provided
  if (!world || !navigation || !belonging || !belongingType) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} custom>
      <WorldPageLayout
        heading={`${world.metadata.title} ${belongingType.title}: ${belonging.metadata.title}`}
        navigation={navigation}
        worldSlug={world.metadata.slug}
        breadcrumbs={[
          { name: 'Worlds', href: '/worlds' },
          { name: world.metadata.title, href: `/worlds/${world.metadata.slug}` },
          { name: 'Belongings', href: `/worlds/${world.metadata.slug}/belongings` },
          { name: belongingType.title, href: `/worlds/${world.metadata.slug}/belongings/${belongingType.slug}` },
          { name: belonging.metadata.title, href: `/worlds/${world.metadata.slug}/belongings/${belongingType.slug}/${belonging.metadata.slug}` },
        ]}
      >
        <h2 className="heading">{belonging.name} Info</h2>
        {belongingType.type === 'WEAPONS' ? (
          <WeaponCard weapon={belonging} verbose />
        ) : belongingType.type === 'WEARABLES' ? (
          <WearableCard wearable={belonging} />
        ) : belongingType.type === 'CONSUMABLES' ? (
          <ConsumableCard consumable={belonging} />
        ) : belongingType.type === 'USABLES' ? (
          <UsableCard usable={belonging} />
        ) : null}
      </WorldPageLayout>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Worlds {
        worlds {
          metadata {
            slug
          }
          sections {
            ... on ComponentWorldsBelongingsOverview {
              weapons {
                slug
              }
              wearables {
                slug
              }
              consumables {
                slug
              }
              usables {
                slug
              }
            }
          }
          weaponsList {
            metadata {
              slug
            }
          }
          wearablesList {
            metadata {
              slug
            }
          }
          consumablesList {
            metadata {
              slug
            }
          }
          usablesList {
            metadata {
              slug
            }
          }
        }
      }
    `,
  });

  let paths = [];

  data.worlds.forEach(world => {
    // get the four belonging routes slugs
    const belSect = world.sections.find(sect => sect.__typename === 'ComponentWorldsBelongingsOverview');

    // get the slugs
    const belMetadata = getSectionPropertySlugs(belSect, world);

    // create the four belongings routes for each world
    belMetadata.children.forEach(bel => {
      // create each individual belonging route for each belonging type
      const belongingParams = world[`${bel.slug}List`].map(indBel => ({
        params: {
          world: world.metadata.slug,
          belonging: bel.slug,
          id: indBel.metadata.slug,
        },
      }));
      paths = [...paths, ...belongingParams];
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { world, belonging, id } = context.params;

  let query;

  switch (belonging) {
    case 'weapons':
      query = QUERY_SINGLE_WEAPON;
      break;
    case 'wearables':
      query = QUERY_SINGLE_WEARABLE;
      break;
    case 'consumables':
      query = QUERY_SINGLE_CONSUMABLE;
      break;
    case 'usables':
      query = QUERY_SINGLE_USABLE;
      break;
  }

  const { data } = await client.query({
    query,
    variables: { slug: id, worldSlug: world },
  });

  const currentBelonging = data[belonging][0];

  const currentWorld = data.worlds[0];

  const belongingsSection = currentWorld.sections.filter(sect => sect.__typename === 'ComponentWorldsBelongingsOverview')[0];

  const belongingContent = {
    title: belongingsSection[belonging].title,
    slug: belonging,
    type: belonging.toUpperCase(),
    description: belongingsSection[belonging].metaDescription,
  };

  // GET WORLD NAVIGATION //
  const navigation = await getWorldNavigation(world, 'belongings');
  // END GET WORLD NAVIGATION //

  return {
    props: {
      world: {
        name: currentWorld.name,
        metadata: currentWorld.metadata,
      },
      belongingType: belongingContent,
      belonging: currentBelonging,
      metadata: {
        ...currentBelonging.metadata,
        title: `${currentBelonging.metadata.title} - ${currentWorld.metadata.title} ${belongingContent.title}`,
        description: currentBelonging.metadata.description || belongingContent.description,
      },
      navigation,
    },
  };
}

export default SingleBelonging;
