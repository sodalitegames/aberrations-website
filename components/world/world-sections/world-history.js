import Link from 'next/link';

import MarkdownContent from '../../sections/markdown-content';
import OverviewCard from '../../elements/cards/overview-card';

const WorldHistory = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <MarkdownContent data={{ content: data.overview }} />
      {data.sections.map(sect => {
        return (
          <Link key={sect.metadata.title} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${sect.metadata.slug}`}>
            <a>
              <OverviewCard heading={sect.metadata.title} overview={sect.metadata.description || sect.about.substring(0, 150)} noImage />
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default WorldHistory;
