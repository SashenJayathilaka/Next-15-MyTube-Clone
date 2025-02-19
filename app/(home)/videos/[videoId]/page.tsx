import { DEFAULT_LIMIT } from "@/constants";
import VideoView from "@/modules/videos/ui/views/video-view";
import { HydrateClient, trpc } from "@/trpc/server";

type Props = {
  params: Promise<{ videoId: string }>;
};

async function Page({ params }: Props) {
  const { videoId } = await params;
  void trpc.videos.getOne.prefetch({ id: videoId });
  void trpc.comments.getMany.prefetchInfinite({
    videoId: videoId,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
}

export default Page;
