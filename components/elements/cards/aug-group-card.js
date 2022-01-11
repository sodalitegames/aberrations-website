import CardContainer from '../card-container';

export default function AugGroupCard({ group }) {
  return (
    <CardContainer heading={group.groupName} noImage noPadding>
      <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-800">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{group.augmentation1.pointCost} Point</dt>
          <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
            <span className="italic">{group.augmentation1.name}:</span> {group.augmentation1.description}
          </dd>
        </div>
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{group.augmentation2.pointCost} Points</dt>
          <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
            <span className="italic">{group.augmentation2.name}:</span> {group.augmentation2.description}
          </dd>
        </div>
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{group.augmentation3.pointCost} Points</dt>
          <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
            <span className="italic">{group.augmentation3.name}:</span> {group.augmentation3.description}
          </dd>
        </div>
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{group.augmentation4.pointCost} Points</dt>
          <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
            <span className="italic">{group.augmentation4.name}:</span> {group.augmentation4.description}
          </dd>
        </div>
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{group.augmentation5.pointCost} Points</dt>
          <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
            <span className="italic">{group.augmentation5.name}:</span> {group.augmentation5.description}
          </dd>
        </div>
      </dl>
    </CardContainer>
  );
}
