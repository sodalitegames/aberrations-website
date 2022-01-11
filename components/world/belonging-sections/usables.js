import Link from 'next/link';
import { Fragment } from 'react';
import { usablesTypes } from '../../../utils/maps/belonging-categories';

import UsableCard from '../../elements/cards/usable-card';

const UsablesSection = ({ usables, world }) => {
  return (
    <>
      {usablesTypes.map(type => {
        return (
          <Fragment key={type}>
            <h3 id={type.toLowerCase()} className="heading">
              {type.replaceAll('_', ' ')} Usables
            </h3>
            {usables.list
              .filter(usable => usable.type === type)
              .map(usable => (
                <Link key={usable.name} href={`/worlds/${world.metadata.slug}/belongings/usables/${usable.metadata.slug}`}>
                  <a>
                    <UsableCard usable={usable} />
                  </a>
                </Link>
              ))}
          </Fragment>
        );
      })}
    </>
  );
};

export default UsablesSection;
