import Link from 'next/link';

import RichText from '../../sections/rich-text';
import OverviewCard from '../../elements/cards/overview-card';

const Corponations = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <RichText data={{ content: data.overview }} />
      {data.list.map(corp => {
        return (
          <Link key={corp.name} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${corp.slug}`}>
            <a>
              <OverviewCard heading={corp.name} overview={corp.metaDescription || corp.about.substring(0, 150)} />
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default Corponations;
