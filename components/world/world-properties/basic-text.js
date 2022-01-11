import RichText from '../../sections/rich-text';

const BasicText = ({ data }) => {
  return (
    <>
      <h2 className="heading">{data.name}</h2>
      <RichText data={{ content: data.about }} />
    </>
  );
};

export default BasicText;
