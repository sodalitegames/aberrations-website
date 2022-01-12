import Link from 'next/link';

import MarkdownContent from '../../sections/markdown-content';
import OverviewCard from '../../elements/cards/overview-card';

const Corponations = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <MarkdownContent data={{ content: data.overview }} />
      {data.sections.map(corp => {
        return (
          <Link key={corp.metadata.title} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${corp.metadata.slug}`}>
            <a>
              <OverviewCard heading={corp.metadata.title} overview={corp.metadata.description || corp.about.substring(0, 150)} />
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default Corponations;
