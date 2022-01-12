const RenderHtml = ({ html, children }) => {
  return <div dangerouslySetInnerHTML={{ __html: children || html }} />;
};

export default RenderHtml;
