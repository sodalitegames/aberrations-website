import ErrorPage from 'next/error';

import client from '../../../lib/apollo-client';

import PageLayout from '../../../layouts/PageLayout';

import MarkdownContent from '../../../components/sections/markdown-content';
import Notice from '../../../components/elements/notice';

import AugGroupCard from '../../../components/elements/cards/aug-group-card';
import SpeciesCard from '../../../components/elements/cards/species-card';
import WeaponCard from '../../../components/elements/cards/weapon-card';
import ConsumableCategoryCard from '../../../components/elements/cards/consumable-category-card';
import CreatureTypeCard from '../../../components/elements/cards/creature-type-card';

import { QUERY_SINGLE_PLAYBOOK } from '../../../utils/queries/playbooks-queries';

const Playbook = ({ sections, data, metadata, navigation }) => {
  // Check if the required data was provided
  if (!sections || !data) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageLayout
      title={metadata.title}
      sideNav={navigation}
      seo={metadata}
      breadcrumbs={[
        { name: 'Get Started', href: '/get-started' },
        { name: 'World Playbooks', href: '/get-started/world-playbooks' },
        { name: metadata.title, href: `/get-started/world-playbooks/${metadata.slug}` },
      ]}
    >
      <Notice
        status="info"
        message="While the game is in beta, only the most updated rules will be displayed. If you wish to see what changes we are making,"
        link={{ text: 'visit our beta change log.', href: '/beta-change-log', inline: true }}
        accent
      />
      <Notice
        status="info"
        message="Important: This playbook only contains what is necessary to play. The rest of the world lore is located elsewhere."
        link={{ text: 'Take me to the lore', href: `/worlds/${metadata.slug}` }}
        accent
      />

      <Notice status="warn" message="This playbook is not fully complete, we apologize and thank you for your patience as we get it ready for you." accent />

      <h2 className="heading pt-8" id="overview">
        Overview
      </h2>
      <MarkdownContent data={{ content: sections.overview }} />

      <h2 className="heading pt-8" id="species">
        Species
      </h2>
      <MarkdownContent data={{ content: sections.species }} />
      <ul>
        {data.speciesList.map(species => (
          <SpeciesCard key={species.name} species={species} />
        ))}
      </ul>

      <h2 className="heading pt-8" id="augmentation-groups">
        Augmentation Groups
      </h2>
      <MarkdownContent data={{ content: sections.augmentations }} />
      {data.augmentationGroups.map(group => (
        <AugGroupCard key={group.groupName} group={group} />
      ))}

      <h2 className="heading pt-8" id="weapons">
        Weapons
      </h2>
      <MarkdownContent data={{ content: sections.weapons }} />

      {data.weaponsList.map(weapon => (
        <WeaponCard key={weapon.name} weapon={weapon} />
      ))}

      <h2 className="heading pt-8" id="consumable-categories">
        Consumable Categories
      </h2>
      <MarkdownContent data={{ content: sections.consumables }} />
      {data.consumableCategories.map(category => (
        <ConsumableCategoryCard key={category.name} category={category} />
      ))}

      <h2 className="heading pt-8" id="creature-types">
        Creature Types
      </h2>
      <MarkdownContent data={{ content: sections.creatures }} />
      {data.creatureTypes.map(type => (
        <CreatureTypeCard key={type.name} type={type} />
      ))}

      <h2 className="heading pt-8" id="world-rules">
        World Rules
      </h2>
      <MarkdownContent data={{ content: sections.worldRules }} />

      <h2 className="heading pt-8" id="world-summary">
        World Summary
      </h2>
      <MarkdownContent data={{ content: sections.worldSummary }} />
    </PageLayout>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: QUERY_SINGLE_PLAYBOOK,
    variables: { slug: 'avarice' },
  });

  const playbook = await import(`../../../content/rules/avarice-world-playbook.md`).catch(error => null);

  console.log(playbook.attributes);

  const { name, navigation, metadata } = playbook.attributes;

  return {
    props: {
      data: data.playbooks[0],
      sections: playbook.attributes,
      navigation,
      metadata,
    },
  };
}

export default Playbook;
