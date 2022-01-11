import { usablesTypes, weaponsAssociatedStats, wearableBodyAreas } from '../maps/belonging-categories';

export const generateWorldNavigation = (world, current) => {
  const navigation = world.sections.map(section => {
    let children;
    const baseUrl = `/worlds/${world.metadata.slug}`;

    switch (section.__typename) {
      case 'ComponentWorldsWorldOverview':
        // map sections as children
        children = section.sections.map(el => ({ name: el.name, href: `${baseUrl}/world-overview/${el.slug}` }));

        // create navigation object
        return {
          name: 'World Overview',
          icon: 'GlobeIcon',
          current: !!(current === 'world-overview'),
          href: `${baseUrl}/world-overview`,
          children,
        };

      case 'ComponentWorldsSpecies':
        // map species as children
        children = world.speciesList.map(spec => ({ name: spec.metadata.title, href: `${baseUrl}/species/${spec.metadata.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About Species', href: `${baseUrl}/species` });

        // create navigation object
        return {
          name: 'Species',
          icon: 'UserGroupIcon',
          current: !!(current === 'species'),
          href: `${baseUrl}/species`,
          children,
        };

      case 'ComponentWorldsCreatures':
        // map creature types as children
        children = world.creatureTypes.map(type => ({ name: type.name, href: `${baseUrl}/creatures#${type.metadata.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About Creatures', href: `${baseUrl}/creatures` });

        // create navigation object
        return {
          name: 'Creatures',
          icon: 'FolderOpenIcon',
          current: !!(current === 'creatures'),
          href: `${baseUrl}/creatures`,
          children,
        };

      case 'ComponentWorldsBelongingsOverview':
        // map children of all four belongings

        // weapons
        const weapons = weaponsAssociatedStats.map(stat => ({ name: stat, href: `${baseUrl}/belongings/weapons#${stat.toLowerCase()}` }));
        // add about to beginning of array
        weapons.unshift({ name: 'About Weapons', href: `${baseUrl}/belongings/weapons` });

        // wearables
        const wearables = wearableBodyAreas.map(area => ({ name: area, href: `${baseUrl}/belongings/wearables#${area.toLowerCase()}` }));
        // add about to beginning of array
        wearables.unshift({ name: 'About Wearables', href: `${baseUrl}/belongings/wearables` });

        // consumables
        const consumables = world.consumableCategories.map(categ => ({ name: categ.name, href: `${baseUrl}/belongings/consumables#${categ.metadata.slug}` }));
        // add about to beginning of array
        consumables.unshift({ name: 'About Consumables', href: `${baseUrl}/belongings/consumables` });

        // usables
        const usables = usablesTypes.map(type => ({ name: type.replaceAll('_', ' '), href: `${baseUrl}/belongings/usables#${type.toLowerCase()}` }));
        // add about to beginning of array
        usables.unshift({ name: 'About Usables', href: `${baseUrl}/belongings/usables` });

        // create navigation object
        return {
          name: 'Belongings',
          icon: 'BriefcaseIcon',
          current: !!(current === 'belongings'),
          href: `${baseUrl}/belongings`,
          children: [
            {
              name: 'About Belongings',
              href: `${baseUrl}/belongings`,
            },
            {
              name: section.weapons.title,
              href: `${baseUrl}/belongings/weapons/${section.weapons.title}`,
              children: weapons,
            },
            {
              name: section.wearables.title,
              href: `${baseUrl}/belongings/wearables/${section.wearables.title}`,
              children: wearables,
            },
            {
              name: section.consumables.title,
              href: `${baseUrl}/belongings/consumables/${section.consumables.title}`,
              children: consumables,
            },
            {
              name: section.usables.title,
              href: `${baseUrl}/belongings/usables/${section.usables.title}`,
              children: usables,
            },
          ],
        };

      case 'ComponentWorldsCorpoNations':
        // map corponations as children
        children = section.list.map(el => ({ name: el.name, href: `${baseUrl}/corponations/${el.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About CorpoNations', href: `${baseUrl}/corponations` });

        // create navigation object
        return {
          name: 'CorpoNations',
          icon: 'OfficeBuildingIcon',
          current: !!(current === 'corponations'),
          href: `${baseUrl}/corponations`,
          children,
        };

      case 'ComponentWorldsReligions':
        // map religions as children
        children = section.list.map(el => ({ name: el.name, href: `${baseUrl}/religions/${el.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About Religions', href: `${baseUrl}/religions` });

        // create navigation object
        return {
          name: 'Religions',
          icon: 'LibraryIcon',
          current: !!(current === 'religions'),
          href: `${baseUrl}/religions`,
          children,
        };

      case 'ComponentWorldsOtherOrganizations':
        // map other organizations as children
        children = section.list.map(el => ({ name: el.name, href: `${baseUrl}/other-organizations/${el.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About Other Orgs', href: `${baseUrl}/other-organizations` });

        // create navigation object
        return {
          name: 'Other Orgs',
          icon: 'IdentificationIcon',
          current: !!(current === 'other-organizations'),
          href: `${baseUrl}/other-organizations`,
          children,
        };

      case 'ComponentWorldsGeographyAndMaps':
        // map sections as children
        children = section.sections.map(el => ({ name: el.name, href: `${baseUrl}/geography-and-maps/${el.slug}` }));

        // add maps to beginning of array
        children.unshift({ name: 'World Maps', href: `${baseUrl}/geography-and-maps` });

        // create navigation object
        return {
          name: 'Geography & Maps',
          icon: 'MapIcon',
          current: !!(current === 'geography-and-maps'),
          href: `${baseUrl}/geography-and-maps`,
          children,
        };

      case 'ComponentWorldsWorldHistory':
        // map sections as children
        children = section.sections.map(el => ({ name: el.name, href: `${baseUrl}/world-history/${el.slug}` }));

        // create navigation object
        return {
          name: 'World History',
          icon: 'BookmarkAltIcon',
          current: !!(current === 'world-history'),
          href: `${baseUrl}/world-history`,
          children,
        };

      default:
        return;
    }
  });

  return navigation;
};
