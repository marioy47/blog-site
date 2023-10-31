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
});

const projects = defineCollection({
  type: 'content',
  schema: ({image}) => {
    return z.object({
      title: z.string(),
      cover: image(),
      date: z.coerce.date(),
      client: z.string(),
      tags: z.array(z.string()),
      summary: z.string()
    })
  }
})

export const collections = { posts, projects };
