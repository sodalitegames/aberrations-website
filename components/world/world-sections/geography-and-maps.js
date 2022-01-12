/* eslint-disable @next/next/no-img-element */
import MarkdownContent from '../../sections/markdown-content';

const GeographyAndMaps = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <MarkdownContent data={{ content: data.overview }} />

      {data.maps.map(({ name, about, image }) => (
        <div key={name} className="prose">
          <h5>{name}</h5>
          <p>{about}</p>
          <img src={image.url} alt={name} width="75%" />
        </div>
      ))}
    </>
  );
};

export default GeographyAndMaps;
