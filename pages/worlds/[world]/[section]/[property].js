import ErrorPage from 'next/error';

import api from '../../../../lib/strapi-api';

import { getPropertySlugs } from '../../../../utils/data/get-property-slugs';
import { fetchWorldNavigationData } from '../../../../utils/data/fetch-world-navigation-data';
import { generateWorldNavigation } from '../../../../utils/data/generate-world-navigation';
import { getCurrentProperty } from '../../../../utils/data/get-current-property';
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
        {property.type && property.type === 'species' ? <SingleSpecies species={property} /> : null}
        {property.type && property.type === 'creatures' ? <SingleCreature creature={property} /> : null}
        {property.type && property.type === 'listable' ? <BasicText data={property} /> : null}
        {property.type && property.type === 'belongings' ? <SingleBelonging belonging={property} world={world} /> : null}
      </WorldPageLayout>
    </PageLayout>
  );
}

export async function getStaticPaths() {
  // fetch the worlds list from api
  const { data: worldsApiData } = await api.get(`/worlds`);

  // get the slugs of all the worlds
  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../../content/worlds', true, /\.md$/));

  // map through the world slugs to create paths
  let paths = await Promise.all(
    slugs.map(async worldSlug => {
      // import the markdown content for each world
      const worldContent = await import(`../../../../content/worlds/${worldSlug}.md`).catch(error => null);
      const worldData = worldsApiData.find(world => world.slug === worldSlug);

      // map through each world section
      return Object.entries(worldContent.attributes)
        .filter(([key, section]) => section.metadata)
        .map(([key, section]) => {
          const propertyPaths = getPropertySlugs({ type: key, ...section }, worldData);

          // create routes for each property of each world section
          return propertyPaths.map(property => ({
            params: {
              world: worldContent.attributes.metadata.slug,
              section: section.metadata.slug,
              property: property.slug,
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
  const { world: _world_param, section: _section_param, property: _property_param } = context.params;

  const worldContent = await import(`../../../../content/worlds/${_world_param}.md`).catch(error => null);

  const worldMetadata = worldContent.attributes.metadata;

  // find the current section by the slug
  let currentSection = { type: _section_param, ...worldContent.attributes[worldSections[_section_param]] };

  // get the current property
  let currentProperty;

  if (_section_param === 'species' || _section_param === 'creatures') {
    // fetch the current species or creature
    const { data } = await api.get(`/${_section_param}?slug=${_property_param}`);

    currentProperty = {
      ...data[0],
      type: _section_param,
    };
  } else if (_section_param === 'belongings') {
    if (_property_param === 'weapons') {
      // fetch the weapons list
      const { data: weapons } = await api.get(`/weapons`);
      const filteredWeapons = weapons.filter(weap => weap.worlds.find(world => world.slug === _world_param));

      currentProperty = {
        ...currentSection[_property_param],
        list: filteredWeapons,
        type: _section_param,
        subType: _property_param,
      };
    }

    if (_property_param === 'wearables') {
      // fetch the wearables list
      const { data: wearables } = await api.get(`/wearables`);
      const filteredWearables = wearables.filter(wear => wear.worlds.find(world => world.slug === _world_param));

      currentProperty = {
        ...currentSection[_property_param],
        list: filteredWearables,
        type: _section_param,
        subType: _property_param,
      };
    }

    if (_property_param === 'consumables') {
      // fetch the consumables list
      const { data: consumables } = await api.get(`/consumables`);
      const filteredConsumables = consumables.filter(cons => cons.worlds.find(world => world.slug === _world_param));

      // fetch the consumable categories list
      const { data: consumableCategories } = await api.get(`/consumables-categories`);
      const filteredConsumableCategories = consumableCategories.filter(categ => categ.worlds.find(world => world.slug === _world_param));

      currentProperty = {
        ...currentSection[_property_param],
        list: filteredConsumables,
        type: _section_param,
        subType: _property_param,
        categories: filteredConsumableCategories,
      };
    }

    if (_property_param === 'usables') {
      // fetch the usables list
      const { data: usables } = await api.get(`/usables`);
      const filteredUsables = usables.filter(usab => usab.worlds.find(world => world.slug === _world_param));

      currentProperty = {
        ...currentSection[_property_param],
        list: filteredUsables,
        type: _section_param,
        subType: _property_param,
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
      property: { type: _property_param, ...currentProperty },
      metadata: currentProperty.metadata,
      navigation,
    },
  };
}
