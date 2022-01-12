import MarkdownContent from '../../sections/markdown-content';
import CardContainer from '../card-container';

export default function CreatureTypeCard({ type }) {
  return (
    <CardContainer heading={type.name}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
          <dd className="mt-1 text-sm space-y-4">
            <MarkdownContent data={{ content: type.description }} />
          </dd>
        </div>
      </dl>
    </CardContainer>
  );
}
