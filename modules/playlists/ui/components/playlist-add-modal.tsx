import InfiniteScroll from "@/components/infinite-scroll";
import ResponsiveSDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Loader2Icon, SquareCheckIcon, SquareIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type PlaylistAddModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string; // Video ID to add to playlist.
};

/* const formSchema = z.object({
  name: z.string().min(1),
});
 */
const PlaylistAddModal: React.FC<PlaylistAddModalProps> = ({
  onOpenChange,
  open,
  videoId,
}) => {
  const utils = trpc.useUtils();

  const {
    data: playlists,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = trpc.playList.getManyForVideo.useInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
      videoId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!videoId && open,
    }
  );

  const handleOpenChange = (newOpen: boolean) => {
    utils.playList.getManyForVideo.reset();
    onOpenChange(newOpen);
  };

  const addVideo = trpc.playList.addVideo.useMutation({
    onSuccess: () => {
      toast.success("Video Add to playlist");
      utils.playList.getMany.invalidate();
      utils.playList.getManyForVideo.invalidate({ videoId });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const removeVideo = trpc.playList.removeVideo.useMutation({
    onSuccess: () => {
      toast.success("Video remove from playlist");
      utils.playList.getMany.invalidate();
      utils.playList.getManyForVideo.invalidate({ videoId });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <ResponsiveSDialog
      title="Add to Playlist"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="flex flex-col gap-2">
        {isLoading && (
          <div className="flex justify-center p-4">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}
        {!isLoading &&
          playlists?.pages
            .flatMap((page) => page.items)
            .map((playlist) => (
              <Button
                key={playlist.id}
                variant="ghost"
                className="w-full justify-start px-2 [&_svg]:size-5"
                size="lg"
                onClick={() => {
                  if (playlist.containsVideo) {
                    removeVideo.mutate({ playlistId: playlist.id, videoId });
                  } else {
                    addVideo.mutate({ playlistId: playlist.id, videoId });
                  }
                }}
                disabled={
                  addVideo.isPending || removeVideo.isPending || !videoId
                }
              >
                {playlist.containsVideo ? (
                  <SquareCheckIcon className="mr-2" />
                ) : (
                  <SquareIcon className="mr-2" />
                )}
                {playlist.name}
              </Button>
            ))}
        {!isLoading && (
          <InfiniteScroll
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            isManual
          />
        )}
      </div>
    </ResponsiveSDialog>
  );
};
export default PlaylistAddModal;
