import classNames from 'utils/functions/classnames';

interface SectionDividerProps {
  heading: string;
  id: string;
  nomargin?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ heading, id, nomargin }) => {
  return (
    <div className={classNames('relative', !nomargin ? 'mt-12' : '')}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t-2 border-gray-200 dark:border-gray-800" />
      </div>
      <div className="relative flex justify-start">
        <h2 id={id} className="pr-3 my-6 font-sans text-4xl font-semibold text-gray-900 bg-white dark:bg-dark dark:text-gray-300">
          {heading.toUpperCase()}
        </h2>
      </div>
    </div>
  );
};

export default SectionDivider;
