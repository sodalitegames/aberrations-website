export const getSectionSlugs = sectionTypename => {
  switch (sectionTypename) {
    case 'ComponentWorldsSpecies':
      return 'species';

    case 'ComponentWorldsCreatures':
      return 'creatures';

    case 'ComponentWorldsGeographyAndMaps':
      return 'geography-and-maps';

    case 'ComponentWorldsWorldHistory':
      return 'world-history';

    case 'ComponentWorldsWorldOverview':
      return 'world-overview';

    case 'ComponentWorldsCorpoNations':
      return 'corponations';

    case 'ComponentWorldsReligions':
      return 'religions';

    case 'ComponentWorldsOtherOrganizations':
      return 'other-organizations';

    case 'ComponentWorldsBelongingsOverview':
      return 'belongings';

    default:
      return;
  }
};
