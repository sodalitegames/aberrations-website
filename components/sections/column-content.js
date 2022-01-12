import HtmlContent from './html-content';

const ColumnContent = ({ data }) => {
  return (
    <div className="mb-12 md:mb-0 py-2 px-2 overflow-hidden">
      <div className="md:p-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          <Column sections={data.leftColumn} />
          <Column sections={data.rightColumn} />
        </div>
      </div>
    </div>
  );
};

const Column = ({ sections }) => {
  return (
    <div>
      {sections.map((section, index) => {
        if (section.type === 'content') {
          return <HtmlContent data={section} />;
        }

        if (section.type === 'image') {
          return <div key={index}>IMAGE</div>;
        }
      })}
    </div>
  );
};

export default ColumnContent;
