import { DEFAULT_LIMIT } from "@/constants";
import VideosView from "@/modules/playlists/ui/views/videos-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ playlistId: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { playlistId } = await params;
  void trpc.playList.getOne.prefetch({ id: playlistId });
  void trpc.playList.getVideos.prefetchInfinite({
    playlistId,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <VideosView playlistId={playlistId} />
    </HydrateClient>
  );
};
export default Page;
