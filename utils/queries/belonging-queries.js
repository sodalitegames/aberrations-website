import { gql } from '@apollo/client';

export const QUERY_SINGLE_WEAPON = gql`
  query SingleWeapon($slug: String, $worldSlug: String) {
    weapons(where: { slug: $slug }) {
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
      ability
      levelDamage
      range
      associatedStat
      type
      image {
        url
      }
    }
    worlds(where: { slug: $worldSlug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsBelongingsOverview {
          weapons {
            title
            metaDescription
          }
        }
      }
    }
  }
`;

export const QUERY_SINGLE_WEARABLE = gql`
  query SingleWearable($slug: String, $worldSlug: String) {
    wearables(where: { slug: $slug }) {
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
      bodyArea
      statBlock {
        stat
        amount
      }
      image {
        url
      }
    }
    worlds(where: { slug: $worldSlug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsBelongingsOverview {
          wearables {
            title
            metaDescription
          }
        }
      }
    }
  }
`;

export const QUERY_SINGLE_CONSUMABLE = gql`
  query SingleConsumable($slug: String, $worldSlug: String) {
    consumables(where: { slug: $slug }) {
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
    worlds(where: { slug: $worldSlug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsBelongingsOverview {
          consumables {
            title
            metaDescription
          }
        }
      }
    }
  }
`;

export const QUERY_SINGLE_USABLE = gql`
  query SingleUsable($slug: String, $worldSlug: String) {
    usables(where: { slug: $slug }) {
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
      type
      image {
        url
      }
    }
    worlds(where: { slug: $worldSlug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsBelongingsOverview {
          usables {
            title
            metaDescription
          }
        }
      }
    }
  }
`;
