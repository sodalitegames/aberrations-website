export const getPropertyContent = (section, world, id) => {
  switch (section.__typename) {
    case 'ComponentWorldsWorldHistory':
    case 'ComponentWorldsWorldOverview':
    case 'ComponentWorldsGeographyAndMaps':
      const content = section.sections.find(sect => sect.slug === id);
      return {
        ...content,
        type: 'LISTABLE',
      };

    case 'ComponentWorldsCorpoNations':
    case 'ComponentWorldsReligions':
    case 'ComponentWorldsOtherOrganizations':
      const item = section.list.find(sect => sect.slug === id);
      return {
        ...item,
        type: 'LISTABLE',
      };

    case 'ComponentWorldsBelongingsOverview':
      const belonging = section[id];

      return {
        ...belonging,
        list: world[`${id}List`],
        type: 'BELONGING',
        subType: id.toUpperCase(),
        categories: belonging.slug === 'consumables' ? world.consumableCategories : null,
      };

    case 'ComponentWorldsSpecies':
    case 'ComponentWorldsCreatures':
      return;

    default:
      return;
  }
};
