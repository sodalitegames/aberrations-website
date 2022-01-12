import ErrorPage from 'next/error';

import client from '../../../../lib/apollo-client';

import { QUERY_WORLD_WEAPONS, QUERY_WORLD_WEARABLES, QUERY_WORLD_CONSUMABLES, QUERY_WORLD_USABLES, QUERY_ALL_WORLDS_SECTION_PROPERTY_SLUGS } from '../../../../utils/queries/worlds-queries';
import { QUERY_SINGLE_SPECIES } from '../../../../utils/queries/species-queries';
import { QUERY_SINGLE_CREATURE } from '../../../../utils/queries/creature-queries';

import { getSectionPropertySlugs } from '../../../../utils/functions/get-section-property-slugs';
import { fetchWorldNavigationData } from '../../../../utils/functions/fetch-world-navigation-data';
import { generateWorldNavigation } from '../../../../utils/data/generate-world-navigation';
import { getCurrentProperty } from '../../../../utils/functions/get-current-property';
import { worldSections } from '../../../../utils/maps/world-sections';

import PageLayout from '../../../../layouts/PageLayout';
import WorldPageLayout from '../../../../layouts/WorldPageLayout';

import SingleBelonging from '../../../../components/world/world-properties/single-belonging';
import BasicText from '../../../../components/world/world-properties/basic-text';
import SingleCreature from '../../../../components/world/world-properties/single-creature';
import SingleSpecies from '../../../../components/world/world-properties/single-species';

export default function SingleProperty({ world, section, property, metadata, navigation }) {
  // Check if the required data was provided
  if (!world || !navigation || !section || !property) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout title={metadata.title} seo={metadata} custom>
      <WorldPageLayout
        heading={`${property.metadata.title} - ${world.metadata.title} ${section.metadata.title}`}
        navigation={navigation}
        worldSlug={world.metadata.slug}
        breadcrumbs={[
          { name: 'Worlds', href: '/worlds' },
          { name: world.metadata.title, href: `/worlds/${world.metadata.slug}` },
          { name: section.metadata.title, href: `/worlds/${world.metadata.slug}/${section.metadata.slug}` },
          { name: property.metadata.title, href: `/worlds/${world.metadata.slug}/${section.metadata.slug}/${property.metadata.slug}` },
        ]}
      >
        {property.__typename === 'Specie' ? <SingleSpecies species={property} /> : null}
        {property.__typename === 'Creatures' ? <SingleCreature creature={property} /> : null}
        {property.type && property.type === 'LISTABLE' ? <BasicText data={property} /> : null}
        {property.type && property.type === 'BELONGING' ? <SingleBelonging belonging={property} world={world} /> : null}
      </WorldPageLayout>
    </PageLayout>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: QUERY_ALL_WORLDS_SECTION_PROPERTY_SLUGS,
  });

  let paths = [];

  data.worlds.forEach(world => {
    // create the routes for each world section
    world.sections.forEach(sect => {
      // get the list of section slugs and children/property slugs
      const sectionContent = getSectionPropertySlugs(sect, world);

      if (!sectionContent.children) return null;

      // create the routes for each item in a sections list of sub-sections
      const propertyParams = sectionContent.children
        .map(el => ({
          params: {
            world: world.metadata.slug,
            section: sectionContent.slug,
            property: el.slug,
          },
        }))
        .filter(param => param && param.params.property);

      paths = [...paths, ...propertyParams];
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { world: _world_param, section: _section_param, property: _property_param } = context.params;

  const worldContent = await import(`../../../../content/worlds/${_world_param}.md`).catch(error => null);

  const worldMetadata = worldContent.attributes.metadata;

  // find the current section by the slug
  let currentSection = { type: _section_param, ...worldContent.attributes[worldSections[_section_param]] };

  console.log(currentSection);

  // get the current property
  let currentProperty;

  if (_section_param === 'species') {
    const {
      data: { species },
    } = await client.query({
      query: QUERY_SINGLE_SPECIES,
      variables: { slug: _property_param },
    });

    currentProperty = species[0];
  } else if (_section_param === 'creatures') {
    const {
      data: { creatures },
    } = await client.query({
      query: QUERY_SINGLE_CREATURE,
      variables: { slug: _property_param },
    });

    currentProperty = creatures[0];
  } else if (_section_param === 'belongings') {
    if (_property_param === 'weapons') {
      const {
        data: { worlds },
      } = await client.query({
        query: QUERY_WORLD_WEAPONS,
        variables: { slug: _world_param },
      });

      currentProperty = {
        ...currentSection[_property_param],
        list: worlds[0].weaponsList,
        type: 'BELONGING',
        subType: _property_param.toUpperCase(),
      };
    }

    if (_property_param === 'wearables') {
      const {
        data: { worlds },
      } = await client.query({
        query: QUERY_WORLD_WEARABLES,
        variables: { slug: _world_param },
      });

      currentProperty = {
        ...currentSection[_property_param],
        list: worlds[0].wearablesList,
        type: 'BELONGING',
        subType: _property_param.toUpperCase(),
      };
    }

    if (_property_param === 'consumables') {
      const {
        data: { worlds },
      } = await client.query({
        query: QUERY_WORLD_CONSUMABLES,
        variables: { slug: _world_param },
      });

      currentProperty = {
        ...currentSection[_property_param],
        list: worlds[0].consumablesList,
        type: 'BELONGING',
        subType: _property_param.toUpperCase(),
        categories: worlds[0].consumableCategories,
      };
    }

    if (_property_param === 'usables') {
      const {
        data: { worlds },
      } = await client.query({
        query: QUERY_WORLD_USABLES,
        variables: { slug: _world_param },
      });

      currentProperty = {
        ...currentSection[_property_param],
        list: worlds[0].usablesList,
        type: 'BELONGING',
        subType: _property_param.toUpperCase(),
      };
    }
  } else {
    // find the data for the current property
    currentProperty = getCurrentProperty(currentSection, _property_param);
  }

  // GET WORLD NAVIGATION //
  const navigationData = await fetchWorldNavigationData(_world_param);
  const navigation = generateWorldNavigation(worldContent.attributes, navigationData, _section_param);
  // END GET WORLD NAVIGATION //

  console.log(currentProperty);

  return {
    props: {
      world: {
        name: worldMetadata.title,
        metadata: worldMetadata,
      },
      section: {
        type: currentSection.type,
        metadata: currentSection.metadata,
      },
      property: currentProperty,
      metadata: currentProperty.metadata,
      navigation,
    },
  };
}
