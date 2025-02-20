import { db } from "@/db";
import { commentsReactions } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const commentsReactionsRouter = createTRPCRouter({
  like: protectedProcedure
    .input(z.object({ commentId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { commentId } = input;
      const { id: userId } = ctx.user;

      const [existingCommentsReactionsLike] = await db
        .select()
        .from(commentsReactions)
        .where(
          and(
            eq(commentsReactions.commentId, commentId),
            eq(commentsReactions.userId, userId),
            eq(commentsReactions.type, "like")
          )
        );

      if (existingCommentsReactionsLike) {
        const [deletedViewerReaction] = await db
          .delete(commentsReactions)
          .where(
            and(
              eq(commentsReactions.userId, userId),
              eq(commentsReactions.commentId, commentId)
            )
          )
          .returning();

        return deletedViewerReaction;
      }

      const [createdCommentsReactions] = await db
        .insert(commentsReactions)
        .values({ userId, commentId, type: "like" })
        .onConflictDoUpdate({
          target: [commentsReactions.userId, commentsReactions.commentId],
          set: { type: "like" },
        })
        .returning();

      return createdCommentsReactions;
    }),

  dislike: protectedProcedure
    .input(z.object({ commentId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const { commentId } = input;
      const { id: userId } = ctx.user;

      const [existingCommentsReactionsDislike] = await db
        .select()
        .from(commentsReactions)
        .where(
          and(
            eq(commentsReactions.commentId, commentId),
            eq(commentsReactions.userId, userId),
            eq(commentsReactions.type, "dislike")
          )
        );

      if (existingCommentsReactionsDislike) {
        const [deletedCommentsReaction] = await db
          .delete(commentsReactions)
          .where(
            and(
              eq(commentsReactions.userId, userId),
              eq(commentsReactions.commentId, commentId)
            )
          )
          .returning();

        return deletedCommentsReaction;
      }

      const [createdCommentsReactions] = await db
        .insert(commentsReactions)
        .values({ userId, commentId, type: "dislike" })
        .onConflictDoUpdate({
          target: [commentsReactions.userId, commentsReactions.commentId],
          set: { type: "dislike" },
        })
        .returning();

      return createdCommentsReactions;
    }),
});
