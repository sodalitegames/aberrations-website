import Link from 'next/link';

import RichText from '../../sections/rich-text';
import SpeciesCard from '../../elements/cards/species-card';

const Species = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <RichText data={{ content: data.overview }} />
      {data.species.map(species => (
        <Link key={species.name} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${species.metadata.slug}`}>
          <a>
            <SpeciesCard species={species} />
          </a>
        </Link>
      ))}
    </>
  );
};

export default Species;
