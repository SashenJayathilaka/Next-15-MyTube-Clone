import { db } from "@/db";
import { videos } from "@/db/schema";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    /**
     * Creates a new video and initiates an upload to Mux.//+
     * @remarks//+
     * This function is a protected mutation procedure that requires a valid user context.//+
     * It creates a new video record in the database and initiates an upload to Mux.//+
     * The Mux upload is configured with the provided user ID as the passthrough value,//+
     * public playback policy, and standard MP4 support.//+
     * @param ctx - The user context containing the authenticated user's ID.//+
     * @returns An object containing the newly created video record.//+
     */

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        passthrough: userId,
        playback_policy: ["public"],
        input: [
          {
            generated_subtitles: [
              {
                language_code: "en",
                name: "English",
              },
            ],
          },
        ],
      },
      cors_origin: "*",
    });

    const [video] = await db
      .insert(videos)
      .values({
        userId: userId,
        title: "Untitled",
        muxStatus: "waiting",
        muxUploadId: upload.id,
      })
      .returning();

    return {
      video: video,
      url: upload.url,
    };
  }),
});
