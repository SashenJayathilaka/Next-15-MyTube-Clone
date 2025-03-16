import FramerClient from "@/components/framer-client";
import { DEFAULT_LIMIT } from "@/constants";
import LikedView from "@/modules/playlists/ui/views/liked-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page: React.FC = () => {
  void trpc.playList.getLiked.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <FramerClient>
        <LikedView />
      </FramerClient>
    </HydrateClient>
  );
};
export default Page;
