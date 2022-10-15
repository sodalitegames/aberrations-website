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
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Shield Value</dt>
          <dd className="mt-1 text-sm">{wearable.shieldValue}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Speed Adjustment</dt>
          <dd className="mt-1 text-sm">{wearable.speedAdjustment}</dd>
        </div>
        {wearable.modifiers.length ? (
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Modifiers</dt>
            <dd className="mt-1 text-sm">{wearable.modifiers.map(modifier => `${modifier.amount > 0 ? '+' : ''}${modifier.amount} ${modifier.name}`).join(', ')}</dd>
          </div>
        ) : null}
        {/* {wearable.modifiers.map(modifier => (
          <div key={modifier._id} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{modifier.name} Modifier</dt>
            <dd className="mt-1 text-sm">{modifier.amount}</dd>
          </div>
        ))} */}
      </dl>
    </CardContainer>
  );
}
