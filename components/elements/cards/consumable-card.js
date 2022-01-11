import NewlineText from '../../utility/newline-text';
import CardContainer from '../card-container';

export default function ConsumableCard({ consumable }) {
  return (
    <CardContainer heading={consumable.name} imageUrl={consumable.image ? consumable.image.url : null}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={consumable.description} />
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Level</dt>
          <dd className="mt-1 text-sm">{consumable.level}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{consumable.consumableCategories.length > 1 ? 'Categories' : 'Category'}</dt>
          <dd className="mt-1 text-sm">{consumable.consumableCategories.map(categ => categ.name).join(', ')}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Uses</dt>
          <dd className="mt-1 text-sm">{consumable.uses}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Associated Stat</dt>
          <dd className="mt-1 text-sm">{consumable.associatedStat}</dd>
        </div>
      </dl>
    </CardContainer>
  );
}
