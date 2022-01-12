import MarkdownContent from '../../sections/markdown-content';

const BasicText = ({ data }) => {
  return (
    <>
      <h2 className="heading">{data.name}</h2>
      <MarkdownContent data={{ content: data.content }} />
    </>
  );
};

export default BasicText;
