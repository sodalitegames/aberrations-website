import classNames from '../../utils/functions/classnames';

export default function SectionDivider({ heading, id, nomargin }) {
  return (
    <div className={classNames('relative', !nomargin ? 'mt-12' : '')}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t-2 border-gray-200 dark:border-gray-800" />
      </div>
      <div className="relative flex justify-start">
        <h2 id={id} className="pr-3 bg-white dark:bg-dark text-4xl font-sans my-6 text-gray-900 dark:text-gray-300 font-semibold">
          {heading.toUpperCase()}
        </h2>
      </div>
    </div>
  );
}
