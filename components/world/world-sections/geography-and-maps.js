/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import MarkdownContent from '../../sections/markdown-content';
import OverviewCard from '../../elements/cards/overview-card';

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

      {data.sections.map(sect => {
        return (
          <Link key={sect.metadata.title} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${sect.metadata.slug}`}>
            <a>
              <OverviewCard heading={sect.metadata.title} overview={sect.metadata.description || sect.about.substring(0, 150)} />
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default GeographyAndMaps;
