import NewlineText from 'components/utility/newline-text';
import CardContainer from 'components/elements/card-container';

export default function WeaponCard({ weapon }) {
  return (
    <CardContainer heading={weapon.name}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Range</dt>
          <dd className="mt-1 text-sm">{weapon.range}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Stat</dt>
          <dd className="mt-1 text-sm">{weapon.stat}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Ability</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={weapon.ability} />
          </dd>
        </div>
      </dl>
    </CardContainer>
  );
}
