import Link from 'next/link';

import MarkdownContent from '../../sections/markdown-content';
import OverviewCard from '../../elements/cards/overview-card';

const Religions = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <MarkdownContent data={{ content: data.overview }} />
      {data.sections.map(rel => {
        return (
          <Link key={rel.metadata.title} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${rel.metadata.slug}`}>
            <a>
              <OverviewCard heading={rel.metadata.title} overview={rel.metadata.description || rel.about.substring(0, 150)} />
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default Religions;
