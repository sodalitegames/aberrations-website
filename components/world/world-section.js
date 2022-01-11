import Belongings from './world-sections/belongings';
import Corponations from './world-sections/corponations';
import Creatures from './world-sections/creatures';
import GeographyAndMaps from './world-sections/geography-and-maps';
import OtherOrganizations from './world-sections/other-organizations';
import Overview from './world-sections/overview';
import Religions from './world-sections/religions';
import Species from './world-sections/species';
import WorldHistory from './world-sections/world-history';

// Map Strapi sections to section components
const sectionComponents = {
  ComponentWorldsBelongingsOverview: Belongings,
  ComponentWorldsCorpoNations: Corponations,
  ComponentWorldsCreatures: Creatures,
  ComponentWorldsGeographyAndMaps: GeographyAndMaps,
  ComponentWorldsOtherOrganizations: OtherOrganizations,
  ComponentWorldsWorldOverview: Overview,
  ComponentWorldsReligions: Religions,
  ComponentWorldsSpecies: Species,
  ComponentWorldsWorldHistory: WorldHistory,
};

// Display a section individually
const WorldSection = ({ section, world }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[section.__typename];

  if (!SectionComponent) {
    return null;
  }

  // Display the section
  return <SectionComponent data={section} world={world} />;
};

export default WorldSection;

// const apiSectionComponents = {
//   'worlds.belongings-overview': Belongings,
//   'worlds.corpo-nations': Corponations,
//   'worlds.creatures': Creatures,
//   'worlds.geography-and-maps': GeographyAndMaps,
//   'worlds.other-organizations': OtherOrganizations,
//   'worlds.world-overview': Overview,
//   'worlds.religions': Religions,
//   'worlds.species': Species,
//   'worlds.world-history': WorldHistory,
// };
