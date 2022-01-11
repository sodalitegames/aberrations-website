import Link from 'next/link';

import RichText from '../../sections/rich-text';
import OverviewCard from '../../elements/cards/overview-card';

const OtherOrganizations = ({ data, world }) => {
  return (
    <>
      <h2 className="heading">{data.metadata.title}</h2>
      <RichText data={{ content: data.overview }} />
      {data.list.map(org => {
        return (
          <Link key={org.name} href={`/worlds/${world.metadata.slug}/${data.metadata.slug}/${org.slug}`}>
            <a>
              <OverviewCard heading={org.name} overview={org.metaDescription || org.about.substring(0, 150)} />
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default OtherOrganizations;
