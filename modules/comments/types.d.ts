import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type CommentsGetManyOutput =
  inferRouterOutputs<AppRouter>["comments"]["getMany"];
