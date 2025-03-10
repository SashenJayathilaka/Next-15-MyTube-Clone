import { categoriesRouter } from "@/modules/categories/server/procedures";
import { commentsReactionsRouter } from "@/modules/comments-reactions/server/procedures";
import { commentsRouter } from "@/modules/comments/server/procedures";
import { playListRouter } from "@/modules/playlists/server/procedures";
import { searchRouter } from "@/modules/search/server/procedures";
import { studioRouter } from "@/modules/studio/server/procedures";
import { subscriptionsRouter } from "@/modules/subscription/server/procedures";
import { suggestionsRouter } from "@/modules/suggestions/server/procedures";
import { usersRouters } from "@/modules/users/server/procedures";
import { videoReactionsRouter } from "@/modules/video-reactions/server/procedures";
import { videoViewsRouter } from "@/modules/video-views/server/procedures";
import { videosRouter } from "@/modules/videos/server/procedures";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  videos: videosRouter,
  users: usersRouters,
  comments: commentsRouter,
  categories: categoriesRouter,
  videoViews: videoViewsRouter,
  subscriptions: subscriptionsRouter,
  search: searchRouter,
  videoReactions: videoReactionsRouter,
  commentsReactions: commentsReactionsRouter,
  suggestions: suggestionsRouter,
  playList: playListRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
