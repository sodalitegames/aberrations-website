import { usablesTypes, weaponsAssociatedStats, wearableBodyAreas } from '../maps/belonging-categories';

export const generateWorldNavigation = (world, data, current) => {
  const navigation = Object.entries(world).map(([key, section]) => {
    let children;
    const baseUrl = `/worlds/${world.metadata.slug}`;

    switch (key) {
      case 'worldOverview':
        // map sections as children
        children = section.sections.map(el => ({ name: el.metadata.title, href: `${baseUrl}/${section.metadata.slug}/${el.metadata.slug}` }));

        // create navigation object
        return {
          name: section.metadata.title,
          icon: 'GlobeIcon',
          current: !!(current === section.metadata.slug),
          href: `${baseUrl}/${section.metadata.slug}`,
          children,
        };

      case 'species':
        // map species as children
        children = data.speciesList.map(spec => ({ name: spec.metadata.title, href: `${baseUrl}/${section.metadata.slug}/${spec.metadata.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About Species', href: `${baseUrl}/${section.metadata.slug}` });

        // create navigation object
        return {
          name: section.metadata.title,
          icon: 'UserGroupIcon',
          current: !!(current === section.metadata.slug),
          href: `${baseUrl}/${section.metadata.slug}`,
          children,
        };

      case 'creatures':
        // map creature types as children
        children = data.creatureTypes.map(type => ({ name: type.name, href: `${baseUrl}/${section.metadata.slug}#${type.metadata.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About Creatures', href: `${baseUrl}/${section.metadata.slug}` });

        // create navigation object
        return {
          name: 'Creatures',
          icon: 'FolderOpenIcon',
          current: !!(current === section.metadata.slug),
          href: `${baseUrl}/${section.metadata.slug}`,
          children,
        };

      case 'belongings':
        // map children of all four belongings

        // weapons
        const weapons = weaponsAssociatedStats.map(stat => ({ name: stat, href: `${baseUrl}/${section.metadata.slug}/weapons#${stat.toLowerCase()}` }));
        // add about to beginning of array
        weapons.unshift({ name: 'About Weapons', href: `${baseUrl}/${section.metadata.slug}/weapons` });

        // wearables
        const wearables = wearableBodyAreas.map(area => ({ name: area, href: `${baseUrl}/${section.metadata.slug}/wearables#${area.toLowerCase()}` }));
        // add about to beginning of array
        wearables.unshift({ name: 'About Wearables', href: `${baseUrl}/${section.metadata.slug}/wearables` });

        // consumables
        const consumables = data.consumableCategories.map(categ => ({ name: categ.name, href: `${baseUrl}/${section.metadata.slug}/consumables#${categ.metadata.slug}` }));
        // add about to beginning of array
        consumables.unshift({ name: 'About Consumables', href: `${baseUrl}/${section.metadata.slug}/consumables` });

        // usables
        const usables = usablesTypes.map(type => ({ name: type.replaceAll('_', ' '), href: `${baseUrl}/${section.metadata.slug}/usables#${type.toLowerCase()}` }));
        // add about to beginning of array
        usables.unshift({ name: 'About Usables', href: `${baseUrl}/${section.metadata.slug}/usables` });

        // create navigation object
        return {
          name: section.metadata.title,
          icon: 'BriefcaseIcon',
          current: !!(current === section.metadata.slug),
          href: `${baseUrl}/${section.metadata.slug}`,
          children: [
            {
              name: 'About Belongings',
              href: `${baseUrl}/${section.metadata.slug}`,
            },
            {
              name: section.weapons.metadata.title,
              href: `${baseUrl}/${section.metadata.slug}/weapons/${section.weapons.metadata.slug}`,
              children: weapons,
            },
            {
              name: section.wearables.metadata.title,
              href: `${baseUrl}/${section.metadata.slug}/wearables/${section.wearables.metadata.slug}`,
              children: wearables,
            },
            {
              name: section.consumables.metadata.title,
              href: `${baseUrl}/${section.metadata.slug}/consumables/${section.consumables.metadata.slug}`,
              children: consumables,
            },
            {
              name: section.usables.metadata.title,
              href: `${baseUrl}/${section.metadata.slug}/usables/${section.usables.metadata.slug}`,
              children: usables,
            },
          ],
        };

      case 'corponations':
        // map corponations as children
        children = section.sections.map(el => ({ name: el.metadata.title, href: `${baseUrl}/${section.metadata.slug}/${el.metadata.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About CorpoNations', href: `${baseUrl}/${section.metadata.slug}` });

        // create navigation object
        return {
          name: section.metadata.title,
          icon: 'OfficeBuildingIcon',
          current: !!(current === section.metadata.slug),
          href: `${baseUrl}/${section.metadata.slug}`,
          children,
        };

      case 'religions':
        // map religions as children
        children = section.sections.map(el => ({ name: el.metadata.title, href: `${baseUrl}/${section.metadata.slug}/${el.metadata.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About Religions', href: `${baseUrl}/${section.metadata.slug}` });

        // create navigation object
        return {
          name: section.metadata.title,
          icon: 'LibraryIcon',
          current: !!(current === section.metadata.slug),
          href: `${baseUrl}/${section.metadata.slug}`,
          children,
        };

      case 'otherOrganizations':
        // map other organizations as children
        children = section.sections.map(el => ({ name: el.metadata.title, href: `${baseUrl}/${section.metadata.slug}/${el.metadata.slug}` }));

        // add about to beginning of array
        children.unshift({ name: 'About Other Orgs', href: `${baseUrl}/${section.metadata.slug}` });

        // create navigation object
        return {
          name: section.metadata.title,
          icon: 'IdentificationIcon',
          current: !!(current === section.metadata.slug),
          href: `${baseUrl}/${section.metadata.slug}`,
          children,
        };

      case 'geographyAndMaps':
        // map sections as children
        children = section.sections.map(el => ({ name: el.metadata.title, href: `${baseUrl}/${section.metadata.slug}/${el.metadata.slug}` }));

        // add maps to beginning of array
        children.unshift({ name: 'World Maps', href: `${baseUrl}/${section.metadata.slug}/maps` });

        // create navigation object
        return {
          name: section.metadata.title,
          icon: 'MapIcon',
          current: !!(current === section.metadata.slug),
          href: `${baseUrl}/${section.metadata.slug}`,
          children,
        };

      case 'worldHistory':
        // map sections as children
        children = section.sections.map(el => ({ name: el.metadata.title, href: `${baseUrl}/${section.metadata.slug}/${el.metadata.slug}` }));

        // create navigation object
        return {
          name: section.metadata.title,
          icon: 'BookmarkAltIcon',
          current: !!(current === section.metadata.slug),
          href: `${baseUrl}/${section.metadata.slug}`,
          children,
        };

      default:
        return;
    }
  });

  return { worldNav: navigation.filter(item => item), worldName: world.metadata.title };
};
