import NewlineText from '../../utility/newline-text';
import CardContainer from '../card-container';

export default function WearableCard({ wearable }) {
  return (
    <CardContainer heading={wearable.name}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={wearable.description} />
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Body Area</dt>
          <dd className="mt-1 text-sm">{wearable.bodyArea}</dd>
        </div>
        {wearable.statBlock.map(stat => (
          <div key={stat.stat} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.stat} Modifier</dt>
            <dd className="mt-1 text-sm">{stat.amount}</dd>
          </div>
        ))}
      </dl>
    </CardContainer>
  );
}
