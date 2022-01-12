export const getSectionSlugs = section => {
  switch (section) {
    case 'species':
      return 'species';

    case 'creatures':
      return 'creatures';

    case 'geographyAndMaps':
      return 'geography-and-maps';

    case 'worldHistory':
      return 'world-history';

    case 'worldOverview':
      return 'world-overview';

    case 'corponations':
      return 'corponations';

    case 'religions':
      return 'religions';

    case 'otherOrganizations':
      return 'other-organizations';

    case 'belongings':
      return 'belongings';

    default:
      return;
  }
};
