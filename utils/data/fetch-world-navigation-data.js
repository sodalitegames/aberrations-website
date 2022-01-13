import client from '../../lib/apollo-client';

import { QUERY_WORLD_NAVIGATION_DATA } from '../queries/worlds-queries';

export const fetchWorldNavigationData = async worldSlug => {
  // QUERY FOR THE WORLD NAVIGATION //
  const { data } = await client.query({
    query: QUERY_WORLD_NAVIGATION_DATA,
    variables: { slug: worldSlug },
  });

  return data.worlds[0];
};
