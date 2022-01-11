import Link from 'next/link';
import { Fragment } from 'react';

import { weaponsAssociatedStats } from '../../../utils/maps/belonging-categories';

import WeaponCard from '../../elements/cards/weapon-card';

const WeaponsSection = ({ weapons, world }) => {
  return (
    <>
      {weaponsAssociatedStats.map(stat => {
        return (
          <Fragment key={stat}>
            <h3 id={stat.toLowerCase()} className="heading">
              {stat} Weapons
            </h3>
            {weapons.list
              .filter(weapon => weapon.associatedStat === stat)
              .map(weapon => (
                <Link key={weapon.name} href={`/worlds/${world.metadata.slug}/belongings/weapons/${weapon.metadata.slug}`}>
                  <a>
                    <WeaponCard weapon={weapon} verbose />
                  </a>
                </Link>
              ))}
          </Fragment>
        );
      })}
    </>
  );
};

export default WeaponsSection;
