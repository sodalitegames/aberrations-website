import Belongings from './world-sections/belongings';
import Corponations from './world-sections/corponations';
import Creatures from './world-sections/creatures';
import GeographyAndMaps from './world-sections/geography-and-maps';
import OtherOrganizations from './world-sections/other-organizations';
import Overview from './world-sections/overview';
import Religions from './world-sections/religions';
import Species from './world-sections/species';
import WorldHistory from './world-sections/world-history';

// Map world sections to world section components
const sectionComponents = {
  belongings: Belongings,
  corponations: Corponations,
  creatures: Creatures,
  'geography-and-maps': GeographyAndMaps,
  'other-organizations': OtherOrganizations,
  'world-overview': Overview,
  religions: Religions,
  species: Species,
  'world-history': WorldHistory,
};

// Display a section individually
const WorldSection = ({ section, world }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[section.type];

  if (!SectionComponent) {
    return null;
  }

  // Display the section
  return <SectionComponent data={section} world={world} />;
};

export default WorldSection;
