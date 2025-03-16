import FramerClient from "@/components/framer-client";
import { DEFAULT_LIMIT } from "@/constants";
import HistoryView from "@/modules/playlists/ui/views/history-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page: React.FC = () => {
  void trpc.playList.getHistory.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <FramerClient>
        <HistoryView />
      </FramerClient>
    </HydrateClient>
  );
};
export default Page;
