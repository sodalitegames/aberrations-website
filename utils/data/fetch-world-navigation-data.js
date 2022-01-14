import api from '../../lib/strapi-api';

export const fetchWorldNavigationData = async worldSlug => {
  // fetch the worlds list from api
  const { data: worldData } = await api.get(`/worlds?slug=${worldSlug}`);

  return worldData[0];
};
