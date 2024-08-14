import { zfd } from 'zod-form-data';
import { EMediaType } from '@/types';
import { z } from 'zod';

// const createMediaSchemaBase = z.object({
//   postId: zfd.text(),
//   mediaType: zfd.text(z.nativeEnum(EMediaType)),
//   url: zfd.text(),
//   name: zfd.text(),
//   extension: zfd.text(),
//   type: zfd.text(),
//   lastModified: zfd.numeric(),
//   size: zfd.numeric(),
// });

const createMediaSchemaBase = z.object({
  postId: z.string(),
  mediaType: z.nativeEnum(EMediaType),
  url: z.string(),
  name: z.string(),
  extension: z.string(),
  type: z.string(),
  lastModified: z.number(),
  size: z.number(),
});

export const bulkCreateMediasSchemaServer = z.array(createMediaSchemaBase);
