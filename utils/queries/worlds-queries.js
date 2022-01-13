import { gql } from '@apollo/client';

// QUERY WORLD SECTIONS

export const QUERY_WORLD_SPECIES = gql`
  query WorldSpecies($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      speciesList {
        name
        metadata {
          title
          slug
          shareImage {
            url
          }
          description
          twitterUsername
          twitterCardType
        }
        stats {
          fortitude
          agility
          persona
          aptitude
          power
        }
        ability
        appearance
        lore {
          current
          history
          world {
            name
          }
        }
        basicInfo
        image {
          url
        }
      }
    }
  }
`;

export const QUERY_WORLD_CREATURES = gql`
  query WorldCreatures($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      creaturesList {
        name
        metadata {
          title
          slug
          shareImage {
            url
          }
          description
          twitterUsername
          twitterCardType
        }
        description
        damageLevel
        attackingStat
        stats {
          fortitude
          agility
          persona
          aptitude
          power
        }
        image {
          url
        }
        creatureTypes {
          name
          description
        }
      }
      creatureTypes {
        name
        description
        metadata {
          slug
          title
        }
      }
    }
  }
`;

export const QUERY_WORLD_BELONGINGS = gql`
  query WorldBelongings($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      weaponsList {
        name
        metadata {
          slug
        }
        associatedStat
        image {
          url
        }
      }
      wearablesList {
        name
        metadata {
          slug
        }
        bodyArea
        image {
          url
        }
      }
      consumablesList {
        name
        metadata {
          slug
        }
        image {
          url
        }
        consumableCategories {
          name
        }
      }
      usablesList {
        name
        type
        metadata {
          slug
        }
        image {
          url
        }
      }
    }
  }
`;

// QUERY WORLD BELONGINGS

export const QUERY_WORLD_WEAPONS = gql`
  query WorldWeapons($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      weaponsList {
        name
        metadata {
          title
          slug
        }
        description
        ability
        levelDamage
        range
        associatedStat
        type
        image {
          url
        }
      }
    }
  }
`;

export const QUERY_WORLD_WEARABLES = gql`
  query WorldWearables($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      wearablesList {
        name
        metadata {
          title
          slug
        }
        description
        bodyArea
        statBlock {
          stat
          amount
        }
        image {
          url
        }
      }
    }
  }
`;

export const QUERY_WORLD_CONSUMABLES = gql`
  query WorldConsumables($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      consumablesList {
        name
        metadata {
          title
          slug
        }
        description
        uses
        level
        image {
          url
        }
        associatedStat
        consumableCategories {
          name
          description
        }
      }
      consumableCategories {
        name
        description
        metadata {
          slug
          title
        }
      }
    }
  }
`;

export const QUERY_WORLD_USABLES = gql`
  query WorldUsables($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      usablesList {
        name
        metadata {
          title
          slug
        }
        description
        type
        image {
          url
        }
      }
    }
  }
`;

// QUERY WORLD NAVIGATION

export const QUERY_WORLD_NAVIGATION_DATA = gql`
  query WorldNavigationData($slug: String) {
    worlds(where: { slug: $slug }) {
      speciesList {
        name
        metadata {
          title
          slug
        }
      }
      creatureTypes {
        name
        metadata {
          slug
          title
        }
      }
      consumableCategories {
        name
        metadata {
          slug
          title
        }
      }
    }
  }
`;
