import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type UserGetOneOutput = inferRouterOutputs<AppRouter>["users"]["getOne"];
