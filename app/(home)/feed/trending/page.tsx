import FramerClient from "@/components/framer-client";
import { DEFAULT_LIMIT } from "@/constants";
import TrendingView from "@/modules/home/ui/views/trending-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  void trpc.videos.getManyTrending.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <FramerClient>
        <TrendingView />
      </FramerClient>
    </HydrateClient>
  );
}
