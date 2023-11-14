import {getCollection} from 'astro:content';

export async function GET({params}) {
  if (params?.cloudflare === '_redirects') {
    const posts = await getCollection('posts');
    const redirects = posts.reduce((accum , current) => {
      return `${accum}/${current.slug} /blog/${current.slug} 301\n`;
    },'');
    return new Response(redirects);
  }
}

export function getStaticPaths() {
  return [
    { params: { cloudflare: '_redirects'}}
  ]
}
