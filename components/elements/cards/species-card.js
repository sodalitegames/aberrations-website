import NewlineText from '../../utility/newline-text';
import CardContainer from '../card-container';

export default function SpeciesCard({ species }) {
  return (
    <CardContainer heading={species.name}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Appearance</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={species.appearance} />
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Activated Ability</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={species.abilities.activated} />
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Passive Abilities</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={species.abilities.passive} />
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Detraction</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={species.abilities.detraction} />
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Health</dt>
          <dd className="mt-1 text-sm">{species.health.starting}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Increment</dt>
          <dd className="mt-1 text-sm">{species.health.increment}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Strength</dt>
          <dd className="mt-1 text-sm">D{species.stats.strength}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Agility</dt>
          <dd className="mt-1 text-sm">D{species.stats.agility}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Persona</dt>
          <dd className="mt-1 text-sm">D{species.stats.persona}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Aptitude</dt>
          <dd className="mt-1 text-sm">D{species.stats.aptitude}</dd>
        </div>
      </dl>
    </CardContainer>
  );
}
