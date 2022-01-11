import Link from 'next/link';
import { Fragment } from 'react';

import { wearableBodyAreas } from '../../../utils/maps/belonging-categories';

import WearableCard from '../../elements/cards/wearable-card';

const WearablesSection = ({ wearables, world }) => {
  return (
    <>
      {wearableBodyAreas.map(bodyArea => {
        return (
          <Fragment key={bodyArea}>
            <h3 id={bodyArea.toLowerCase()} className="heading">
              {bodyArea} Wearables
            </h3>
            {wearables.list
              .filter(wearable => wearable.bodyArea === bodyArea)
              .map(wearable => (
                <Link key={wearable.name} href={`/worlds/${world.metadata.slug}/belongings/wearables/${wearable.metadata.slug}`}>
                  <a>
                    <WearableCard wearable={wearable} />
                  </a>
                </Link>
              ))}
          </Fragment>
        );
      })}
    </>
  );
};

export default WearablesSection;
