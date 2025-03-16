import FramerClient from "@/components/framer-client";
import { DEFAULT_LIMIT } from "@/constants";
import StudioView from "@/modules/studio/ui/views/studio-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

async function Page() {
  void trpc.studio.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <FramerClient>
        <StudioView />
      </FramerClient>
    </HydrateClient>
  );
}

export default Page;

// 06.07
