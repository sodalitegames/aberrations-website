import NewlineText from '../../utility/newline-text';
import CardContainer from '../card-container';

export default function SpeciesCard({ species }) {
  return (
    <CardContainer heading={species.name}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Basic Info</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={species.basicInfo} />
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Appearance</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={species.appearance} />
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Ability</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={species.ability} />
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Fortitude</dt>
          <dd className="mt-1 text-sm">{species.stats.fortitude}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Agility</dt>
          <dd className="mt-1 text-sm">{species.stats.agility}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Persona</dt>
          <dd className="mt-1 text-sm">{species.stats.persona}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Aptitude</dt>
          <dd className="mt-1 text-sm">{species.stats.aptitude}</dd>
        </div>
      </dl>
    </CardContainer>
  );
}
