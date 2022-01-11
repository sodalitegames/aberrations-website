import { gql } from '@apollo/client';

export const QUERY_SINGLE_SPECIES = gql`
  query SingleSpecies($slug: String) {
    species(where: { slug: $slug }) {
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
`;
