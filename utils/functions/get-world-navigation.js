import client from '../../lib/apollo-client';

import { generateWorldNavigation } from '../data/generate-world-navigation';

import { QUERY_WORLD_NAVIGATION_DATA } from '../queries/worlds-queries';

export const getWorldNavigation = async (worldSlug, activeSlug) => {
  // QUERY FOR THE WORLD NAVIGATION //
  const { data } = await client.query({
    query: QUERY_WORLD_NAVIGATION_DATA,
    variables: { slug: worldSlug },
  });

  // GENERATE THE NAVIGATION //
  const worldNav = generateWorldNavigation(data.worlds[0], activeSlug);

  // RETURN //
  return { worldNav, worldName: data.worlds[0].name };
};
