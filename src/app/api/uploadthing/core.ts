import { getAuthUser } from '@/actions/auth';
import { db } from '@/db';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { z } from 'zod';

const f = createUploadthing();

type MetadataParams = {
  userId: string;
  entityType: 'user' | 'startup';
  imageType: 'image' | 'coverImage';
  entityId?: string; // Optional: needed for startup updates
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        entityType: z.enum(['user', 'startup']),
        imageType: z.enum(['image', 'coverImage']),
        entityId: z.optional(z.string()),
      })
    )
    .middleware(async ({ input }): Promise<MetadataParams> => {
      const userId = await getAuthUser();
      if (!userId) throw new UploadThingError('Unauthorized');

      const { entityType, imageType, entityId } = input;

      return { entityType, imageType, userId, entityId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { userId, entityType, imageType, entityId } = metadata;

      try {
        if (entityType === 'user') {
          await db.user.update({
            where: { id: userId },
            data: {
              [imageType]: file.ufsUrl,
            },
          });
        } else if (entityType === 'startup') {
          if (!entityId)
            throw new Error('Entity ID is required for startup updates');

          await db.startup.update({
            where: { id: entityId },
            data: {
              [imageType]: file.ufsUrl,
            },
          });
        }
      } catch {
        throw new UploadThingError('Failed to update database');
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
