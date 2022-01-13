import ErrorPage from 'next/error';

import client from '../../../lib/apollo-client';

import { QUERY_WORLD_SPECIES, QUERY_WORLD_CREATURES, QUERY_WORLD_BELONGINGS } from '../../../utils/queries/worlds-queries';

import { fetchWorldNavigationData } from '../../../utils/data/fetch-world-navigation-data';
import { generateWorldNavigation } from '../../../utils/data/generate-world-navigation';
import { worldSections } from '../../../utils/maps/world-sections';

import PageLayout from '../../../layouts/PageLayout';
import WorldPageLayout from '../../../layouts/WorldPageLayout';

import WorldSection from '../../../components/world/world-section';

export default function Section({ world, section, metadata, navigation }) {
  // Check if the required data was provided
  if (!world || !section || !navigation) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} custom>
      <WorldPageLayout
        heading={`${section.metadata.title} of ${world.metadata.title}`}
        navigation={navigation}
        worldSlug={world.metadata.slug}
        breadcrumbs={[
          { name: 'Worlds', href: '/worlds' },
          { name: world.metadata.title, href: `/worlds/${world.metadata.slug}` },
          { name: section.metadata.title, href: `/worlds/${world.metadata.slug}/${section.metadata.slug}` },
        ]}
      >
        <WorldSection section={section} world={world} />
      </WorldPageLayout>
    </PageLayout>
  );
}

export async function getStaticPaths() {
  // get the slugs of all the worlds
  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../content/worlds', true, /\.md$/));

  // map through the world slugs to create paths
  let paths = await Promise.all(
    slugs.map(async worldSlug => {
      // import the markdown content for each world
      const worldContent = await import(`../../../content/worlds/${worldSlug}.md`).catch(error => null);

      // create the routes for each world section
      return Object.entries(worldContent.attributes)
        .filter(([key, value]) => value.metadata)
        .map(([key, value]) => {
          return {
            params: {
              world: worldSlug,
              section: value.metadata.slug,
            },
          };
        });
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
  const { world: _world_param, section: _section_param } = context.params;

  const worldContent = await import(`../../../content/worlds/${_world_param}.md`).catch(error => null);

  const worldMetadata = worldContent.attributes.metadata;

  // find the current section by the slug
  let currentSection = { type: _section_param, ...worldContent.attributes[worldSections[_section_param]] };

  console.log(currentSection);

  // if species section, add species list to it
  if (_section_param === 'species') {
    // query species
    const { data } = await client.query({
      query: QUERY_WORLD_SPECIES,
      variables: { slug: _world_param },
    });

    const { speciesList } = data.worlds[0];

    currentSection = {
      ...currentSection,
      species: speciesList,
    };
  }

  // if creatures section, add creatures list to it
  if (_section_param === 'creatures') {
    // query creatures
    const { data } = await client.query({
      query: QUERY_WORLD_CREATURES,
      variables: { slug: _world_param },
    });

    const { creaturesList, creatureTypes } = data.worlds[0];

    currentSection = {
      ...currentSection,
      creatures: creaturesList,
      creatureTypes: creatureTypes,
    };
  }

  // if belongings section, add the four belongings lists to it
  if (_section_param === 'belongings') {
    // query creatures
    const { data } = await client.query({
      query: QUERY_WORLD_BELONGINGS,
      variables: { slug: _world_param },
    });

    const { weaponsList, wearablesList, consumablesList, usablesList } = data.worlds[0];

    currentSection = {
      ...currentSection,
      lists: {
        weapons: weaponsList,
        wearables: wearablesList,
        consumables: consumablesList,
        usables: usablesList,
      },
    };
  }

  // GET WORLD NAVIGATION //
  const navigationData = await fetchWorldNavigationData(_world_param);
  const navigation = generateWorldNavigation(worldContent.attributes, navigationData, _section_param);
  // END GET WORLD NAVIGATION //

  return {
    props: {
      world: {
        name: worldMetadata.title,
        metadata: worldMetadata,
      },
      section: currentSection,
      metadata: {
        ...currentSection.metadata,
        title: `${currentSection.metadata.title} - ${worldMetadata.title}`,
      },
      navigation,
    },
  };
}
