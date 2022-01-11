export function getStrapiMedia(media) {
  const imageUrl = media.url.startsWith('/') ? `${process.env.STRAPI_API_URL}/${media.url}` : media.url;
  return imageUrl;
}
