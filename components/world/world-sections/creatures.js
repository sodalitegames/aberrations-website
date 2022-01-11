import Link from 'next/link';
import { Fragment } from 'react';

import RichText from '../../sections/rich-text';
import CreatureCard from '../../elements/cards/creature-card';

const Creatures = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <RichText data={{ content: data.overview }} />
      {data.creatureTypes.map(type => {
        return (
          <Fragment key={type.name}>
            <h3 id={type.metadata.slug} className="heading">
              {type.name} Creatures
            </h3>
            <RichText data={{ content: type.description }} />

            {data.creatures
              .filter(creature => creature.creatureTypes.find(creaType => creaType.name === type.name))
              .map(creature => (
                <Link key={creature.name} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${creature.metadata.slug}`}>
                  <a>
                    <CreatureCard creature={creature} />
                  </a>
                </Link>
              ))}
          </Fragment>
        );
      })}
    </>
  );
};

export default Creatures;
