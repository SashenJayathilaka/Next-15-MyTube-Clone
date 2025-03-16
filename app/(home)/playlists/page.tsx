import FramerClient from "@/components/framer-client";
import { DEFAULT_LIMIT } from "@/constants";
import PlayListView from "@/modules/playlists/ui/views/playlists-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page: React.FC = async () => {
  void trpc.playList.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <FramerClient>
        <PlayListView />
      </FramerClient>
    </HydrateClient>
  );
};
export default Page;
