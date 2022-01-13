import Link from 'next/link';

import MarkdownContent from '../../sections/markdown-content';
import OverviewCard from '../../elements/cards/overview-card';

const OtherOrganizations = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <MarkdownContent data={{ content: data.overview }} />
      {data.sections.map(org => {
        return (
          <Link key={org.metadata.title} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${org.metadata.slug}`}>
            <a>
              <OverviewCard heading={org.metadata.title} overview={org.metadata.description || org.about.substring(0, 150)} />
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default OtherOrganizations;
