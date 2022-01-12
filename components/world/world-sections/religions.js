import Link from 'next/link';

import MarkdownContent from '../../sections/markdown-content';
import OverviewCard from '../../elements/cards/overview-card';

const Religions = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <MarkdownContent data={{ content: data.overview }} />
      {data.list.map(rel => {
        return (
          <Link key={rel.name} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${rel.slug}`}>
            <a>
              <OverviewCard heading={rel.name} overview={rel.metaDescription || rel.about.substring(0, 150)} />
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default Religions;
