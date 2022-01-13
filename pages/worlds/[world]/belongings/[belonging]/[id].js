import ErrorPage from 'next/error';
import { gql } from '@apollo/client';

import client from '../../../../../lib/apollo-client';

import { QUERY_SINGLE_WEAPON, QUERY_SINGLE_WEARABLE, QUERY_SINGLE_CONSUMABLE, QUERY_SINGLE_USABLE } from '../../../../../utils/queries/belonging-queries';
import { getPropertySlugs } from '../../../../../utils/data/get-property-slugs';
import { fetchWorldNavigationData } from '../../../../../utils/data/fetch-world-navigation-data';
import { generateWorldNavigation } from '../../../../../utils/data/generate-world-navigation';

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
        heading={`${world.metadata.title} ${belongingType.metadata.title}: ${belonging.metadata.title}`}
        navigation={navigation}
        worldSlug={world.metadata.slug}
        breadcrumbs={[
          { name: 'Worlds', href: '/worlds' },
          { name: world.metadata.title, href: `/worlds/${world.metadata.slug}` },
          { name: 'Belongings', href: `/worlds/${world.metadata.slug}/belongings` },
          { name: belongingType.metadata.title, href: `/worlds/${world.metadata.slug}/belongings/${belongingType.metadata.slug}` },
          { name: belonging.metadata.title, href: `/worlds/${world.metadata.slug}/belongings/${belongingType.metadata.slug}/${belonging.metadata.slug}` },
        ]}
      >
        <h2 className="heading">{belonging.name} Info</h2>
        {belonging.__typename === 'Weapons' ? (
          <WeaponCard weapon={belonging} verbose />
        ) : belonging.__typename === 'Wearables' ? (
          <WearableCard wearable={belonging} />
        ) : belonging.__typename === 'Consumables' ? (
          <ConsumableCard consumable={belonging} />
        ) : belonging.__typename === 'Usables' ? (
          <UsableCard usable={belonging} />
        ) : null}
      </WorldPageLayout>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query PropertySlugs {
        worlds {
          metadata {
            slug
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

  // get the slugs of all the worlds
  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../../../content/worlds', true, /\.md$/));

  // map through the world slugs to create paths
  let paths = await Promise.all(
    slugs.map(async worldSlug => {
      // import the markdown content for each world
      const worldContent = await import(`../../../../../content/worlds/${worldSlug}.md`).catch(error => null);
      const worldData = data.worlds.find(world => world.metadata.slug === worldSlug);

      const propertyPaths = getPropertySlugs({ type: 'belongings', ...worldContent.attributes['belongings'] }, worldData);

      // map through each belongings property
      return propertyPaths
        .map(property => {
          // map through belongings list and create routes for each individual belonging
          return worldData[`${property.slug}List`].map(indBel => ({
            params: {
              world: worldContent.attributes.metadata.slug,
              belonging: property.slug,
              id: indBel.metadata.slug,
            },
          }));
        })
        .reduce((oldArr, newArr) => [...oldArr, ...newArr], []);
    })
  );

  // combine the arrays into a single array
  paths = paths.reduce((oldArr, newArr) => [...oldArr, ...newArr], []);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { world: _world_param, belonging: _belonging_param, id: _id_param } = context.params;

  let query;

  switch (_belonging_param) {
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
    variables: { slug: _id_param },
  });

  const worldContent = await import(`../../../../../content/worlds/${_world_param}.md`).catch(error => null);

  const worldMetadata = worldContent.attributes.metadata;

  const belongingType = worldContent.attributes.belongings[_belonging_param];

  const currentBelonging = data[_belonging_param][0];

  // GET WORLD NAVIGATION //
  const navigationData = await fetchWorldNavigationData(_world_param);
  const navigation = generateWorldNavigation(worldContent.attributes, navigationData, 'belongings');
  // END GET WORLD NAVIGATION //

  return {
    props: {
      world: {
        name: worldMetadata.title,
        metadata: worldMetadata,
      },
      belongingType,
      belonging: currentBelonging,
      metadata: {
        ...currentBelonging.metadata,
        title: `${currentBelonging.metadata.title} - ${worldMetadata.title} ${belongingType.metadata.title}`,
        description: currentBelonging.metadata.description || belongingType.metadata.description,
      },
      navigation,
    },
  };
}

export default SingleBelonging;
