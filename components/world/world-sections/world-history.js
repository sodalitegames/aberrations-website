import Link from 'next/link';

import RichText from '../../sections/rich-text';
import OverviewCard from '../../elements/cards/overview-card';

const WorldHistory = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <RichText data={{ content: data.overview }} />
      {data.sections.map(sect => {
        return (
          <Link key={sect.name} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${sect.slug}`}>
            <a>
              <OverviewCard heading={sect.name} overview={sect.metaDescription || sect.about.substring(0, 150)} noImage />
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default WorldHistory;
