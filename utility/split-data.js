export const getParent = parentString => {
  const data = parentString.split('__');
  return {
    title: data[0],
    slug: data[1],
  };
};

export const getCategory = categoryString => {
  const data = categoryString.split('__');
  return {
    title: data[0],
    slug: data[1],
    color: data[2],
  };
};

export const getPost = postString => {
  const data = postString.split('__');
  return {
    title: data[0],
    slug: data[1],
  };
};
