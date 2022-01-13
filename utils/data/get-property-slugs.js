export const getPropertySlugs = (section, data) => {
  switch (section.type) {
    case 'species':
      return data.speciesList.map(spec => ({ slug: spec.metadata.slug }));

    case 'creatures':
      return data.creaturesList.map(spec => ({ slug: spec.metadata.slug }));

    case 'belongings':
      return [
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
      ];

    case 'worldOverview':
    case 'geographyAndMaps':
    case 'worldHistory':
    case 'corponations':
    case 'religions':
    case 'otherOrganizations':
      return section.sections.map(sect => ({ slug: sect.metadata.slug }));

    default:
      return;
  }
};
