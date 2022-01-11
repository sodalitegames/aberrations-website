import CardContainer from '../card-container';

export default function OverviewCard({ heading, overview, noImage }) {
  return (
    <CardContainer heading={heading} noImage={noImage}>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Excerpt</dt>
          <dd className="mt-1 text-sm">{overview}...</dd>
        </div>
      </dl>
    </CardContainer>
  );
}
