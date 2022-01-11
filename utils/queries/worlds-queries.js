import { gql } from '@apollo/client';

// QUERY INDIVIDUAL SECTIONS

export const QUERY_WORLD_OVERVIEW = gql`
  query WorldOverview($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsWorldOverview {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            title
            slug
            shareImage {
              url
            }
            description
            twitterUsername
            twitterCardType
          }
          sections {
            name
            slug
            about
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }
    }
  }
`;

export const QUERY_WORLD_SPECIES = gql`
  query WorldSpecies($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsSpecies {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            title
            slug
            shareImage {
              url
            }
            description
            twitterUsername
            twitterCardType
          }
        }
      }

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
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsCreatures {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            title
            slug
            shareImage {
              url
            }
            description
            twitterUsername
            twitterCardType
          }
        }
      }

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
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsBelongingsOverview {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            title
            slug
            shareImage {
              url
            }
            description
            twitterUsername
            twitterCardType
          }
          weapons {
            overview
            title
            slug
          }
          wearables {
            overview
            title
            slug
          }
          consumables {
            overview
            title
            slug
          }
          usables {
            overview
            title
            slug
          }
        }
      }

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

export const QUERY_WORLD_CORPONATIONS = gql`
  query WorldCorponations($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsCorpoNations {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            title
            slug
            shareImage {
              url
            }
            description
            twitterUsername
            twitterCardType
          }
          list {
            name
            slug
            about
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }
    }
  }
`;

export const QUERY_WORLD_RELIGIONS = gql`
  query WorldReligions($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsReligions {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            title
            slug
            shareImage {
              url
            }
            description
            twitterUsername
            twitterCardType
          }
          list {
            name
            slug
            about
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }
    }
  }
`;

export const QUERY_WORLD_OTHER_ORGANIZATIONS = gql`
  query WorldOtherOrganizations($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsOtherOrganizations {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            title
            slug
            shareImage {
              url
            }
            description
            twitterUsername
            twitterCardType
          }
          list {
            name
            slug
            about
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }
    }
  }
`;

export const QUERY_WORLD_GEOGRAPHY_AND_MAPS = gql`
  query WorldGeographyAndMaps($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsGeographyAndMaps {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            title
            slug
            shareImage {
              url
            }
            description
            twitterUsername
            twitterCardType
          }
          maps {
            name
            about
            image {
              url
            }
          }
          sections {
            name
            slug
            about
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }
    }
  }
`;

export const QUERY_WORLD_HISTORY = gql`
  query WorldHistory($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsWorldHistory {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            title
            slug
            shareImage {
              url
            }
            description
            twitterUsername
            twitterCardType
          }
          sections {
            name
            slug
            about
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }
    }
  }
`;

// INDIVIDUAL BELONGING PROPERTY QUERIES

export const QUERY_WORLD_SPECIES_INDIVIDUAL = gql`
  query WorldSpeciesIndividual($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsSpecies {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            description
          }
        }
      }
    }
  }
`;

export const QUERY_WORLD_CREATURES_INDIVIDUAL = gql`
  query WorldCreaturesIndividual($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsCreatures {
          overview
          metadata {
            title
            slug
          }
          seoMetadata {
            description
          }
        }
      }
    }
  }
`;

export const QUERY_WORLD_WEAPONS = gql`
  query WorldWeapons($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsBelongingsOverview {
          metadata {
            title
            slug
          }
          weapons {
            overview
            title
            slug
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }

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
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsBelongingsOverview {
          metadata {
            title
            slug
          }
          wearables {
            overview
            title
            slug
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }

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
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsBelongingsOverview {
          metadata {
            title
            slug
          }
          consumables {
            overview
            title
            slug
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }
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
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsBelongingsOverview {
          metadata {
            title
            slug
          }
          usables {
            overview
            title
            slug
            metaDescription
            metaShareImage {
              url
            }
            metaTwitterUsername
            metaTwitterCardType
          }
        }
      }

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

// QUERY SECTION AND SECTION PROPERTY SLUGS

export const QUERY_ALL_WORLDS_SECTION_SLUGS = gql`
  query SectionSlugs {
    worlds {
      metadata {
        slug
      }
      sections {
        ... on ComponentWorldsWorldOverview {
          metadata {
            slug
          }
        }
        ... on ComponentWorldsSpecies {
          metadata {
            slug
          }
        }
        ... on ComponentWorldsCreatures {
          metadata {
            slug
          }
        }
        ... on ComponentWorldsBelongingsOverview {
          metadata {
            slug
          }
        }
        ... on ComponentWorldsCorpoNations {
          metadata {
            slug
          }
        }
        ... on ComponentWorldsReligions {
          metadata {
            slug
          }
        }

        ... on ComponentWorldsOtherOrganizations {
          metadata {
            slug
          }
        }

        ... on ComponentWorldsGeographyAndMaps {
          metadata {
            slug
          }
        }
        ... on ComponentWorldsWorldHistory {
          metadata {
            slug
          }
        }
      }
    }
  }
`;

export const QUERY_ALL_WORLDS_SECTION_PROPERTY_SLUGS = gql`
  query SectionPropertySlugs {
    worlds {
      metadata {
        slug
      }
      sections {
        ... on ComponentWorldsWorldOverview {
          metadata {
            slug
          }
          sections {
            slug
          }
        }
        ... on ComponentWorldsSpecies {
          metadata {
            slug
          }
        }
        ... on ComponentWorldsCreatures {
          metadata {
            slug
          }
        }
        ... on ComponentWorldsBelongingsOverview {
          metadata {
            slug
          }
          weapons {
            slug
          }
          wearables {
            slug
          }
          consumables {
            slug
          }
          usables {
            slug
          }
        }
        ... on ComponentWorldsCorpoNations {
          metadata {
            slug
          }
          list {
            slug
          }
        }
        ... on ComponentWorldsReligions {
          metadata {
            slug
          }
          list {
            slug
          }
        }

        ... on ComponentWorldsOtherOrganizations {
          metadata {
            slug
          }
          list {
            slug
          }
        }

        ... on ComponentWorldsGeographyAndMaps {
          metadata {
            slug
          }
          sections {
            slug
          }
        }
        ... on ComponentWorldsWorldHistory {
          metadata {
            slug
          }
          sections {
            slug
          }
        }
      }

      creaturesList {
        metadata {
          slug
        }
      }

      speciesList {
        metadata {
          slug
        }
      }
    }
  }
`;

// QUERY WORLD NAVIGATION

export const QUERY_WORLD_NAVIGATION_DATA = gql`
  query WorldNavigationData($slug: String) {
    worlds(where: { slug: $slug }) {
      name
      metadata {
        title
        slug
      }
      sections {
        ... on ComponentWorldsWorldOverview {
          metadata {
            title
            slug
          }
          sections {
            name
            slug
          }
        }
        ... on ComponentWorldsSpecies {
          metadata {
            title
            slug
          }
        }
        ... on ComponentWorldsCreatures {
          metadata {
            title
            slug
          }
        }
        ... on ComponentWorldsBelongingsOverview {
          metadata {
            title
            slug
          }
          weapons {
            title
            slug
          }
          wearables {
            title
            slug
          }
          consumables {
            title
            slug
          }
          usables {
            title
            slug
          }
        }
        ... on ComponentWorldsCorpoNations {
          metadata {
            title
            slug
          }
          list {
            name
            slug
          }
        }
        ... on ComponentWorldsReligions {
          metadata {
            title
            slug
          }
          list {
            name
            slug
          }
        }

        ... on ComponentWorldsOtherOrganizations {
          metadata {
            title
            slug
          }
          list {
            name
            slug
          }
        }

        ... on ComponentWorldsGeographyAndMaps {
          metadata {
            title
            slug
          }
          sections {
            name
            slug
          }
        }
        ... on ComponentWorldsWorldHistory {
          metadata {
            title
            slug
          }
          sections {
            name
            slug
          }
        }
      }

      creaturesList {
        name
        metadata {
          title
          slug
        }
        creatureTypes {
          name
          metadata {
            title
            slug
          }
        }
      }

      speciesList {
        name
        metadata {
          title
          slug
        }
      }

      weaponsList {
        name
        associatedStat
        metadata {
          title
          slug
        }
      }

      wearablesList {
        name
        bodyArea
        metadata {
          title
          slug
        }
      }

      consumablesList {
        name
        metadata {
          title
          slug
        }
        consumableCategories {
          name
          metadata {
            title
            slug
          }
        }
      }

      usablesList {
        name
        type
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
