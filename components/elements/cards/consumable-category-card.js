import NewlineText from 'components/utility/newline-text';
import CardContainer from 'components/elements/card-container';

export default function ConsumableCategoryCard({ category }) {
  return (
    <CardContainer heading={category.name}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
          <dd className="mt-1 text-sm">
            <NewlineText text={category.description} />
          </dd>
        </div>
      </dl>
    </CardContainer>
  );
}
