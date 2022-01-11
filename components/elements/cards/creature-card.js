import NewlineText from '../../utility/newline-text';
import CardContainer from '../card-container';

export default function CreatureCard({ creature }) {
  return (
    <CardContainer heading={creature.name}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={creature.description} />
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{creature.creatureTypes.length > 1 ? 'Creature Types' : 'Creature Type'}</dt>
          <dd className="mt-1 text-sm">{creature.creatureTypes.map(creat => creat.name).join(', ')}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Attacking Stat</dt>
          <dd className="mt-1 text-sm">{creature.attackingStat}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Damage &amp; Level</dt>
          <dd className="mt-1 text-sm">{creature.damageLevel}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Fortitude</dt>
          <dd className="mt-1 text-sm">{creature.stats.fortitude}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Agility</dt>
          <dd className="mt-1 text-sm">{creature.stats.agility}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Persona</dt>
          <dd className="mt-1 text-sm">{creature.stats.persona}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Aptitude</dt>
          <dd className="mt-1 text-sm">{creature.stats.aptitude}</dd>
        </div>
      </dl>
    </CardContainer>
  );
}
