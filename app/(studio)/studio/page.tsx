import { DEFAULT_LIMIT } from "@/constants";
import StudioView from "@/modules/studio/ui/view/studio-view";
import { HydrateClient, trpc } from "@/trpc/server";

async function Page() {
  void trpc.studio.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
}

export default Page;

// 06.07
