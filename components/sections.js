import MarkdownContent from 'components/sections/markdown-content';
import DigitalTool from 'components/sections/digital-tool';
import UnderConstruction from 'components/sections/under-construction';
import ContactForm from 'components/sections/contact-form';
import MailingList from 'components/sections/mailing-list';
import HeroSection from 'components/sections/hero-section';
import FeaturesList from 'components/sections/features-list';
import FeatureSection from 'components/sections/feature-section';
import ColumnContent from 'components/sections/column-content';
import Buttons from 'components/sections/buttons';
import Heading from 'components/sections/heading';
import NavigationCards from 'components/sections/navigation-cards';

// Map page sections to section components
const sectionComponents = {
  content: MarkdownContent,
  digitalTool: DigitalTool,
  underConstruction: UnderConstruction,
  contactForm: ContactForm,
  mailingList: MailingList,
  hero: HeroSection,
  navigationCards: NavigationCards,
  featuresList: FeaturesList,
  feature: FeatureSection,
  columnContent: ColumnContent,
  heading: Heading,
  buttons: Buttons,
};

// Display a section individually
const Section = ({ sectionData }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.type];

  if (!SectionComponent) {
    return null;
  }

  // Display the section
  return <SectionComponent data={sectionData} />;
};

// Display the list of sections
const Sections = ({ sections }) => {
  return (
    <>
      {/* Show the actual sections */}
      {sections.map((section, index) => (
        <Section sectionData={section} key={`${section.type}-${index}`} />
      ))}
    </>
  );
};

export default Sections;
