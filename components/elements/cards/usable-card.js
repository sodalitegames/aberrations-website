import NewlineText from '../../utility/newline-text';
import CardContainer from '../card-container';

export default function UsableCard({ usable }) {
  return (
    <CardContainer heading={usable.name}>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</dt>
          <dd className="mt-1 text-sm">{usable.type.replaceAll('_', ' ')}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Units</dt>
          <dd className="mt-1 text-sm">{usable.units}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={usable.description} />
          </dd>
        </div>
      </dl>
    </CardContainer>
  );
}
