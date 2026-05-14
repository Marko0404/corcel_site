import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

export const client = createClient({
  projectId: 'cj634504',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  excerpt: string;
  mainImage?: SanityImageSource;
  body?: unknown[];
}

export async function getAllPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, category, excerpt, mainImage
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, category, excerpt, mainImage, body
    }`,
    { slug }
  );
}
