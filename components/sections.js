import RichText from './sections/rich-text';
import DynamicCards from './sections/dynamic-cards';
import DigitalTool from './sections/digital-tool';
import NewsletterSignUp from './sections/newsletter-sign-up';
import UnderConstruction from './sections/under-construction';
import ContactForm from './sections/contact-form';
import MailingListFeature from './sections/mailing-list-feature';
import HeroSection from './sections/hero-section';
import GridWithIcons from './sections/grid-with-icons';
import FeaturesList from './sections/features-list';
import FeatureWithScreenshot from './sections/feature-with-screenshot';
import ColumnContent from './sections/column-content';
import ColumnContentWithImage from './sections/column-content-with-image';

// Map Strapi sections to section components
const sectionComponents = {
  'pages.rich-text': RichText,
  'pages.dynamic-cards': DynamicCards,
  'pages.digital-tool': DigitalTool,
  'pages.newsletter-signup': NewsletterSignUp,
  'pages.under-construction': UnderConstruction,
  'pages.contact-form': ContactForm,
  'pages.mailing-list-feature': MailingListFeature,
  'pages.hero-section': HeroSection,
  'pages.grid-with-icons': GridWithIcons,
  'pages.features-list': FeaturesList,
  'pages.feature-with-screenshot': FeatureWithScreenshot,
  'pages.column-content': ColumnContent,
  'pages.column-content-with-image': ColumnContentWithImage,
};

// Display a section individually
const Section = ({ sectionData }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__component];

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
      {sections.map(section => (
        <Section sectionData={section} key={`${section.__component}${section.id}`} />
      ))}
    </>
  );
};

export default Sections;
