import NewlineText from '../../utility/newline-text';
import CardContainer from '../card-container';

export default function WeaponCard({ weapon, verbose }) {
  return (
    <CardContainer heading={weapon.name}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        {verbose ? (
          <>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
              <dd className="mt-1 text-sm">
                <NewlineText text={weapon.description} />
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Ability</dt>
              <dd className="mt-1 text-sm">
                <NewlineText text={weapon.ability} />
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Range</dt>
              <dd className="mt-1 text-sm">{weapon.range}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Associated Stat</dt>
              <dd className="mt-1 text-sm">{weapon.associatedStat}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Damage Modifier</dt>
              <dd className="mt-1 text-sm">{weapon.damageModifier}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</dt>
              <dd className="mt-1 text-sm">{weapon.type}</dd>
            </div>
          </>
        ) : (
          <>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Ability</dt>
              <dd className="mt-1 text-sm">
                <NewlineText text={weapon.ability} />
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Range</dt>
              <dd className="mt-1 text-sm">{weapon.range}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Associated Stat</dt>
              <dd className="mt-1 text-sm">{weapon.associatedStat}</dd>
            </div>
          </>
        )}
      </dl>
    </CardContainer>
  );
}
