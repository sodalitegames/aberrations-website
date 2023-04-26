import ErrorPage from 'next/error';

import api from '../../../apis/database';

import PageLayout from '../../../layouts/PageLayout';

import MarkdownContent from '../../../components/sections/markdown-content';
import Notice from '../../../components/elements/notice';

import AugGroupCard from '../../../components/elements/cards/aug-group-card';
import SpeciesCard from '../../../components/elements/cards/species-card';
import WeaponCard from '../../../components/elements/cards/weapon-card';
import ConsumableCategoryCard from '../../../components/elements/cards/consumable-category-card';
import CreatureTypeCard from '../../../components/elements/cards/creature-type-card';

const Playbook = ({ playbook, resources, metadata, navigation }) => {
  // Check if the required data was provided
  if (!playbook || !resources) {
    return <ErrorPage statusCode={500} />;
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

      <h2 className="pt-8 heading" id="overview">
        Overview
      </h2>
      <MarkdownContent data={{ content: playbook.overview }} />

      <h2 className="pt-8 heading" id="species">
        Species
      </h2>
      <MarkdownContent data={{ content: playbook.species }} />
      <ul>
        {resources.species.map(species => (
          <SpeciesCard key={species.name} species={species} />
        ))}
      </ul>

      <h2 className="pt-8 heading" id="augmentation-groups">
        Augmentation Groups
      </h2>
      <MarkdownContent data={{ content: playbook.augmentations }} />
      {resources.augmentationGroups.map(group => (
        <AugGroupCard key={group.name} group={group} />
      ))}

      <h2 className="pt-8 heading" id="weapons">
        Weapons
      </h2>
      <MarkdownContent data={{ content: playbook.weapons }} />

      {resources.weapons.map(weapon => (
        <WeaponCard key={weapon.name} weapon={weapon} />
      ))}

      <h2 className="pt-8 heading" id="consumable-categories">
        Consumable Categories
      </h2>
      <MarkdownContent data={{ content: playbook.consumables }} />
      {resources.consumableCategories.map(category => (
        <ConsumableCategoryCard key={category.name} category={category} />
      ))}

      <h2 className="pt-8 heading" id="creature-types">
        Creature Types
      </h2>
      <MarkdownContent data={{ content: playbook.creatures }} />
      {resources.creatureTypes.map(type => (
        <CreatureTypeCard key={type.name} type={type} />
      ))}

      <h2 className="pt-8 heading" id="world-rules">
        World Rules
      </h2>
      <MarkdownContent data={{ content: playbook.worldRules }} />

      <h2 className="pt-8 heading" id="world-summary">
        World Summary
      </h2>
      <MarkdownContent data={{ content: playbook.worldSummary }} />
    </PageLayout>
  );
};

export async function getStaticPaths() {
  const slugs = (context => {
    return context.keys().map(key => key.replace(/^.*[\\\/]/, '').slice(0, -3));
  })(require.context('../../../content/playbooks', true, /\.md$/));

  const paths = slugs.map(slug => ({
    params: {
      playbook: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { playbook: _playbook } = context.params;

  const playbook = await import(`../../../content/playbooks/${_playbook}.md`).catch(error => null);

  const { id, navigation, metadata } = playbook.attributes;

  const { data: resources } = await api.get(`/playbooks/${id}`);

  return {
    props: {
      resources,
      playbook: playbook.attributes,
      navigation,
      metadata,
    },
  };
}

export default Playbook;
