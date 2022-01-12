import { gql } from '@apollo/client';

export const QUERY_SINGLE_PLAYBOOK = gql`
  query GetPlaybook($slug: String) {
    playbooks: worldPlaybooks(where: { slug: $slug }) {
      name
      consumableCategories {
        name
        description
      }
      creatureTypes {
        name
        description
      }
      weaponsList {
        name
        ability
        range
        associatedStat
      }
      speciesList {
        name
        ability
        basicInfo
        appearance
        stats {
          fortitude
          agility
          persona
          aptitude
          power
        }
      }
      augmentationGroups {
        groupName
        augmentation1 {
          name
          pointCost
          description
        }
        augmentation2 {
          name
          pointCost
          description
        }
        augmentation3 {
          name
          pointCost
          description
        }
        augmentation4 {
          name
          pointCost
          description
        }
        augmentation5 {
          name
          pointCost
          description
        }
      }
    }
  }
`;
