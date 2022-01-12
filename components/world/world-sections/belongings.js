import Link from 'next/link';

import MarkdownContent from '../../sections/markdown-content';
import SmallGridItem from '../../elements/small-grid-item';

const Belongings = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <MarkdownContent data={{ content: data.overview }} />

      <h2 className="heading">Weapons</h2>
      <MarkdownContent data={{ content: data.weapons.overview }} />
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {data.lists.weapons.map(weapon => (
          <Link key={weapon.name} href={`/worlds/${world.metadata.slug}/belongings/weapons/${weapon.metadata.slug}`}>
            <a>
              <SmallGridItem primaryText={weapon.name} secondaryText={weapon.associatedStat} />
            </a>
          </Link>
        ))}
      </ul>

      <Link href={`/worlds/${world.metadata.slug}/belongings/weapons`}>
        <a className="text-secondary-light hover:text-blue-700 dark:text-secondary-fade dark:hover:text-blue-300">See all weapons...</a>
      </Link>

      <h3 className="heading pt-8">Wearables</h3>
      <MarkdownContent data={{ content: data.wearables.overview }} />
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {data.lists.wearables.map(wearable => (
          <Link key={wearable.name} href={`/worlds/${world.metadata.slug}/belongings/wearables/${wearable.metadata.slug}`}>
            <a>
              <SmallGridItem primaryText={wearable.name} secondaryText={wearable.bodyArea} />
            </a>
          </Link>
        ))}
      </ul>

      <Link href={`/worlds/${world.metadata.slug}/belongings/wearables`}>
        <a className="text-secondary-light hover:text-blue-700 dark:text-secondary-fade dark:hover:text-blue-300">See all wearables...</a>
      </Link>

      <h3 className="heading pt-8">Consumables</h3>
      <MarkdownContent data={{ content: data.consumables.overview }} />
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {data.lists.consumables.map(consumable => (
          <Link key={consumable.name} href={`/worlds/${world.metadata.slug}/belongings/consumables/${consumable.metadata.slug}`}>
            <a>
              <SmallGridItem primaryText={consumable.name} secondaryText={consumable.consumableCategories.map(categ => categ.name).join(', ')} />
            </a>
          </Link>
        ))}
      </ul>

      <Link href={`/worlds/${world.metadata.slug}/belongings/consumables`}>
        <a className="text-secondary-light hover:text-blue-700 dark:text-secondary-fade dark:hover:text-blue-300">See all consumables...</a>
      </Link>

      <h3 className="heading pt-8">Usables</h3>
      <MarkdownContent data={{ content: data.usables.overview }} />
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {data.lists.usables.map(usable => (
          <Link key={usable.name} href={`/worlds/${world.metadata.slug}/belongings/usables/${usable.metadata.slug}`}>
            <a>
              <SmallGridItem primaryText={usable.name} secondaryText={usable.type.replaceAll('_', ' ')} />
            </a>
          </Link>
        ))}
      </ul>
      <Link href={`/worlds/${world.metadata.slug}/belongings/usables`}>
        <a className="text-secondary-light hover:text-blue-700 dark:text-secondary-fade dark:hover:text-blue-300">See all usables...</a>
      </Link>
    </>
  );
};

export default Belongings;
