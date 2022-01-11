export const getSectionPropertySlugs = (section, world) => {
  switch (section.__typename) {
    case 'ComponentWorldsSpecies':
      return {
        slug: 'species',
        children: world.speciesList.map(spec => ({ slug: spec.metadata.slug })),
      };

    case 'ComponentWorldsCreatures':
      return {
        slug: 'creatures',
        children: world.creaturesList.map(spec => ({ slug: spec.metadata.slug })),
      };

    case 'ComponentWorldsGeographyAndMaps':
      return {
        slug: 'geography-and-maps',
        children: section.sections.map(sect => ({ slug: sect.slug })),
      };

    case 'ComponentWorldsWorldHistory':
      return {
        slug: 'world-history',
        children: section.sections.map(sect => ({ slug: sect.slug })),
      };

    case 'ComponentWorldsWorldOverview':
      return {
        slug: 'world-overview',
        children: section.sections.map(sect => ({ slug: sect.slug })),
      };

    case 'ComponentWorldsCorpoNations':
      return {
        slug: 'corponations',
        children: section.list.map(sect => ({ slug: sect.slug })),
      };

    case 'ComponentWorldsReligions':
      return {
        slug: 'religions',
        children: section.list.map(sect => ({ slug: sect.slug })),
      };

    case 'ComponentWorldsOtherOrganizations':
      return {
        slug: 'other-organizations',
        children: section.list.map(sect => ({ slug: sect.slug })),
      };

    case 'ComponentWorldsBelongingsOverview':
      return {
        slug: 'belongings',
        children: [
          {
            slug: 'weapons',
          },
          {
            slug: 'wearables',
          },
          {
            slug: 'consumables',
          },
          {
            slug: 'usables',
          },
        ],
      };

    default:
      return;
  }
};
