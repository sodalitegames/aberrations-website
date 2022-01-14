import ErrorPage from 'next/error';

import api from '../../../../../lib/strapi-api';

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
        {belongingType.type === 'weapons' ? <WeaponCard weapon={belonging} verbose /> : null}
        {belongingType.type === 'wearables' ? <WearableCard wearable={belonging} /> : null}
        {belongingType.type === 'consumables' ? <ConsumableCard consumable={belonging} /> : null}
        {belongingType.type === 'usables' ? <UsableCard usable={belonging} /> : null}
      </WorldPageLayout>
    </PageLayout>
  );
};

export async function getStaticPaths() {
  // fetch the worlds list from api
  const { data: worldsApiData } = await api.get(`/worlds`);

  // get the slugs of all the worlds
  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../../../content/worlds', true, /\.md$/));

  // map through the world slugs to create paths
  let paths = await Promise.all(
    slugs.map(async worldSlug => {
      // import the markdown content for each world
      const worldContent = await import(`../../../../../content/worlds/${worldSlug}.md`).catch(error => null);
      const worldData = worldsApiData.find(world => world.slug === worldSlug);

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

  // fetch the current belonging
  const { data } = await api.get(`/${_belonging_param}?slug=${_id_param}`);

  const worldContent = await import(`../../../../../content/worlds/${_world_param}.md`).catch(error => null);

  const worldMetadata = worldContent.attributes.metadata;

  const belongingType = worldContent.attributes.belongings[_belonging_param];

  const currentBelonging = data[0];

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
      belongingType: { type: _belonging_param, ...belongingType },
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
