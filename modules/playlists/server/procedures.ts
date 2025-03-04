import { db } from "@/db";
import {
  playLists,
  playListVideos,
  users,
  videoReactions,
  videos,
  videoViews,
} from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, getTableColumns, lt, or, sql } from "drizzle-orm";
import { z } from "zod";

export const playListRouter = createTRPCRouter({
  removeVideo: protectedProcedure
    .input(
      z.object({
        playlistId: z.string().uuid(),
        videoId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { playlistId, videoId } = input;
      const { id: userId } = ctx.user;

      const [existingPlaylists] = await db
        .select()
        .from(playLists)
        .where(and(eq(playLists.id, playlistId), eq(playLists.userId, userId)));

      if (!existingPlaylists) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [existingVideo] = await db
        .select()
        .from(videos)
        .where(eq(playLists.id, playlistId));

      if (!existingVideo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [existingPlaylistVideo] = await db
        .select()
        .from(playListVideos)
        .where(
          and(
            eq(playListVideos.playLitsId, playlistId),
            eq(playListVideos.videoId, videoId)
          )
        );

      if (existingPlaylistVideo) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      const [createdPlayListVideos] = await db
        .insert(playListVideos)
        .values({
          playLitsId: playlistId,
          videoId: videoId,
        })
        .returning();

      return createdPlayListVideos;
    }),
  addVideo: protectedProcedure
    .input(
      z.object({
        playlistId: z.string().uuid(),
        videoId: z.string().uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { playlistId, videoId } = input;
      const { id: userId } = ctx.user;

      const [existingPlaylists] = await db
        .select()
        .from(playLists)
        .where(and(eq(playLists.id, playlistId), eq(playLists.userId, userId)));

      if (!existingPlaylists) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [existingVideo] = await db
        .select()
        .from(videos)
        .where(eq(playLists.id, playlistId));

      if (!existingVideo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [existingPlaylistVideo] = await db
        .select()
        .from(playListVideos)
        .where(
          and(
            eq(playListVideos.playLitsId, playlistId),
            eq(playListVideos.videoId, videoId)
          )
        );

      if (existingPlaylistVideo) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      const [createdPlayListVideos] = await db
        .insert(playListVideos)
        .values({
          playLitsId: playlistId,
          videoId: videoId,
        })
        .returning();

      return createdPlayListVideos;
    }),
  getManyForVideo: protectedProcedure
    .input(
      z.object({
        videoId: z.string().uuid(),
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const { cursor, limit, videoId } = input;

      const data = await db
        .select({
          ...getTableColumns(playLists),
          videoCount: db.$count(
            playListVideos,
            eq(playLists.id, playListVideos.playLitsId)
          ),
          user: users,
          containsVideo: videoId
            ? sql<boolean>`
          (
            SELECT EXISTS (
              SELECT 1
              FROM ${playListVideos} pv
              WHERE pv.playlist_id = ${playLists.id} AND pv.video_id = ${videoId}
            )
          )`
            : sql<boolean>`false`,
        })
        .from(playLists)
        .innerJoin(users, eq(playLists.userId, users.id))
        .where(
          and(
            eq(playLists.userId, userId),
            cursor
              ? or(
                  lt(playLists.updateAt, cursor.updatedAt),
                  and(
                    eq(playLists.updateAt, cursor.updatedAt),
                    lt(playLists.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(playLists.updateAt), desc(playLists.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data;
      const lastItems = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastItems.id,
            updatedAt: lastItems.updateAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const { cursor, limit } = input;

      const data = await db
        .select({
          ...getTableColumns(playLists),
          videoCount: db.$count(
            playListVideos,
            eq(playLists.id, playListVideos.playLitsId)
          ),
          user: users,
        })
        .from(playLists)
        .innerJoin(users, eq(playLists.userId, users.id))
        .where(
          and(
            eq(playLists.userId, userId),
            cursor
              ? or(
                  lt(playLists.updateAt, cursor.updatedAt),
                  and(
                    eq(playLists.updateAt, cursor.updatedAt),
                    lt(playLists.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(playLists.updateAt), desc(playLists.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data;
      const lastItems = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastItems.id,
            updatedAt: lastItems.updateAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      const { name } = input;
      const { id: userId } = ctx.user;

      const [createdPlayList] = await db
        .insert(playLists)
        .values({
          userId,
          name,
        })
        .returning();

      if (!createdPlayList) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      return createdPlayList;
    }),
  getLiked: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            likedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const { cursor, limit } = input;

      const reactionVideoViews = db.$with("viewer_video_reactions").as(
        db
          .select({
            videoId: videoReactions.videoId,
            likedAt: videoReactions.updateAt,
          })
          .from(videoReactions)
          .where(
            and(
              eq(videoReactions.userId, userId),
              eq(videoReactions.type, "like")
            )
          )
      );

      const data = await db
        .with(reactionVideoViews)
        .select({
          ...getTableColumns(videos),
          user: users,
          likedAt: reactionVideoViews.likedAt,
          viewCount: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
          likeCount: db.$count(
            videoReactions,
            and(
              eq(videoReactions.videoId, videos.id),
              eq(videoReactions.type, "like")
            )
          ),
          dislikeCount: db.$count(
            videoReactions,
            and(
              eq(videoReactions.videoId, videos.id),
              eq(videoReactions.type, "dislike")
            )
          ),
        })
        .from(videos)
        .innerJoin(users, eq(videos.userId, users.id))
        .innerJoin(
          reactionVideoViews,
          eq(videos.id, reactionVideoViews.videoId)
        )
        .where(
          and(
            eq(videos.visibility, "public"),
            cursor
              ? or(
                  lt(reactionVideoViews.likedAt, cursor.likedAt),
                  and(
                    eq(reactionVideoViews.likedAt, cursor.likedAt),
                    lt(videos.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(reactionVideoViews.likedAt), desc(videos.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data;
      const lastItems = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastItems.id,
            likedAt: lastItems.likedAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
  getHistory: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            viewedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id: userId } = ctx.user;
      const { cursor, limit } = input;

      const viewerVideoViews = db.$with("viewer_video_views").as(
        db
          .select({
            videoId: videoViews.videoId,
            viewedAt: videoViews.updateAt,
          })
          .from(videoViews)
          .where(eq(videoViews.userId, userId))
      );

      const data = await db
        .with(viewerVideoViews)
        .select({
          ...getTableColumns(videos),
          user: users,
          viewedAt: viewerVideoViews.viewedAt,
          viewCount: db.$count(videoViews, eq(videoViews.videoId, videos.id)),
          likeCount: db.$count(
            videoReactions,
            and(
              eq(videoReactions.videoId, videos.id),
              eq(videoReactions.type, "like")
            )
          ),
          dislikeCount: db.$count(
            videoReactions,
            and(
              eq(videoReactions.videoId, videos.id),
              eq(videoReactions.type, "dislike")
            )
          ),
        })
        .from(videos)
        .innerJoin(users, eq(videos.userId, users.id))
        .innerJoin(viewerVideoViews, eq(videos.id, viewerVideoViews.videoId))
        .where(
          and(
            eq(videos.visibility, "public"),
            cursor
              ? or(
                  lt(viewerVideoViews.viewedAt, cursor.viewedAt),
                  and(
                    eq(viewerVideoViews.viewedAt, cursor.viewedAt),
                    lt(videos.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(viewerVideoViews.viewedAt), desc(videos.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data;
      const lastItems = items[items.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastItems.id,
            viewedAt: lastItems.viewedAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
});
