export const getCurrentProperty = (section, property) => {
  switch (section.type) {
    case 'world-history':
    case 'world-overview':
    case 'geography-and-maps':
    case 'corponations':
    case 'religions':
    case 'other-organizations':
      const content = section.sections.find(sect => sect.metadata.slug === property);
      return {
        ...content,
        type: 'LISTABLE',
      };

    case 'belongings':
    case 'species':
    case 'creatures':
      return;

    default:
      return;
  }
};
