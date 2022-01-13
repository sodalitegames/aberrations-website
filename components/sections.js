import MarkdownContent from './sections/markdown-content';
import HtmlContent from './sections/html-content';
import DigitalTool from './sections/digital-tool';
import UnderConstruction from './sections/under-construction';
import ContactForm from './sections/contact-form';
import MailingList from './sections/mailing-list';
import HeroSection from './sections/hero-section';
import FeaturesList from './sections/features-list';
import FeatureSection from './sections/feature-section';
import ColumnContent from './sections/column-content';
import Buttons from './sections/buttons';
import Heading from './sections/heading';
import NavigationCards from './sections/navigation-cards';
import RulesSection from './sections/rules-section';

// Map page sections to section components
const sectionComponents = {
  htmlContent: HtmlContent,
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
  rules: RulesSection,
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
