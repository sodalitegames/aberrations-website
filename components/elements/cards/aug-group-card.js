import CardContainer from '../card-container';

export default function AugGroupCard({ group }) {
  return (
    <CardContainer heading={group.name} noImage noPadding>
      <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-800">
        {group.augmentations.map(aug => (
          <div key={aug.id} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {aug.cost} {aug.cost === 1 ? 'Point' : 'Points'}
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <span className="italic">{aug.name}:</span> {aug.description}
            </dd>
          </div>
        ))}
      </dl>
    </CardContainer>
  );
}
