import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: ({image}) => {
    return z.object({
        title: z.string(),
        date: z.coerce.date(),
        update: z.coerce.date().optional(),
        tags: z.array(z.string()),
        cover: image().optional(),
        draft: z.boolean().optional().default(false)
      })
  } 
})

export const collections = { posts };
