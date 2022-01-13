import { gql } from '@apollo/client';

export const QUERY_SINGLE_WEAPON = gql`
  query SingleWeapon($slug: String) {
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
  }
`;

export const QUERY_SINGLE_WEARABLE = gql`
  query SingleWearable($slug: String) {
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
  }
`;

export const QUERY_SINGLE_CONSUMABLE = gql`
  query SingleConsumable($slug: String) {
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
  }
`;

export const QUERY_SINGLE_USABLE = gql`
  query SingleUsable($slug: String) {
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
  }
`;
