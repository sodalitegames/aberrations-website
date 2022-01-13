export const parseDate = date => {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

export const parseDateShort = date => {
  return new Date(date).toLocaleDateString();
};
