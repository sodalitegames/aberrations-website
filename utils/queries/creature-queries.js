import { gql } from '@apollo/client';

export const QUERY_SINGLE_CREATURE = gql`
  query SingleCreature($slug: String) {
    creatures(where: { slug: $slug }) {
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
  }
`;
