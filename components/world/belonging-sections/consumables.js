import Link from 'next/link';
import { Fragment } from 'react';

import ConsumableCard from '../../elements/cards/consumable-card';
import NewlineText from '../../utility/newline-text';

const ConsuamblesSection = ({ consumables, world }) => {
  return (
    <>
      {consumables.categories.map(categ => {
        return (
          <Fragment key={categ.name}>
            <h3 id={categ.metadata.slug} className="heading">
              {categ.name}
            </h3>
            <NewlineText text={categ.description} />
            {consumables.list
              .filter(consumable => consumable.consumableCategories.find(category => category.name === categ.name))
              .map(consumable => (
                <Link key={consumable.name} href={`/worlds/${world.metadata.slug}/belongings/consumables/${consumable.metadata.slug}`}>
                  <a>
                    <ConsumableCard consumable={consumable} />
                  </a>
                </Link>
              ))}
          </Fragment>
        );
      })}
    </>
  );
};

export default ConsuamblesSection;
