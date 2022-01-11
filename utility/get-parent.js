export const getParent = parent => {
  const split = parent.split('__');
  return {
    title: split[0],
    slug: split[1],
  };
};
