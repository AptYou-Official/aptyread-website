export function socialImageFor(slug: string, title: string) {
  return {
    url: `https://www.aptyread.ai/social/${slug}.png`,
    width: 1200,
    height: 630,
    alt: title,
  };
}

export const socialImage = socialImageFor(
  "aptyread-share-v2",
  "Help your child read English and understand. AptyRead for ages 4 to 10.",
);

export const socialImageUrl = socialImage.url;
