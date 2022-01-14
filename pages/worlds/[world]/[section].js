import ErrorPage from 'next/error';

import api from '../../../lib/strapi-api';

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

  // if species section, add species list to it
  if (_section_param === 'species') {
    // fetch the species list
    const { data: species } = await api.get(`/species`);

    const filteredSpecies = species.filter(spec => spec.worlds.find(world => world.slug === _world_param));

    currentSection = {
      ...currentSection,
      species: filteredSpecies,
    };
  }

  // if creatures section, add creatures list to it
  if (_section_param === 'creatures') {
    // fetch the creatures list
    const { data: creatures } = await api.get(`/creatures`);
    const filteredCreatures = creatures.filter(crea => crea.worlds.find(world => world.slug === _world_param));

    // fetch the creature types list
    const { data: creatureTypes } = await api.get(`/creature-types`);
    const filteredCreatureTypes = creatureTypes.filter(type => type.worlds.find(world => world.slug === _world_param));

    currentSection = {
      ...currentSection,
      creatures: filteredCreatures,
      creatureTypes: filteredCreatureTypes,
    };
  }

  // if belongings section, add the four belongings lists to it
  if (_section_param === 'belongings') {
    // fetch the weapons list
    const { data: weapons } = await api.get(`/weapons`);
    const filteredWeapons = weapons.filter(weap => weap.worlds.find(world => world.slug === _world_param));

    // fetch the wearables list
    const { data: wearables } = await api.get(`/wearables`);
    const filteredWearables = wearables.filter(wear => wear.worlds.find(world => world.slug === _world_param));

    // fetch the consumables list
    const { data: consumables } = await api.get(`/consumables`);
    const filteredConsumables = consumables.filter(cons => cons.worlds.find(world => world.slug === _world_param));

    // fetch the usables list
    const { data: usables } = await api.get(`/usables`);
    const filteredUsables = usables.filter(usab => usab.worlds.find(world => world.slug === _world_param));

    currentSection = {
      ...currentSection,
      lists: {
        weapons: filteredWeapons,
        wearables: filteredWearables,
        consumables: filteredConsumables,
        usables: filteredUsables,
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
