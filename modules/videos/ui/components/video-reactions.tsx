import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { useClerk } from "@clerk/nextjs";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { VideoGetOneOutput } from "../../types";

type VideoReactionsProps = {
  videoId: string;
  likes: number;
  dislikes: number;
  viewerReactions: VideoGetOneOutput["viewerReaction"];
};

const VideoReactions: React.FC<VideoReactionsProps> = ({
  dislikes,
  likes,
  videoId,
  viewerReactions,
}) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const like = trpc.videoReactions.like.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
      utils.playList.getLiked.invalidate();
    },

    onError: (error) => {
      toast.error("An error occurred");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });
  const dislike = trpc.videoReactions.dislike.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
      utils.playList.getLiked.invalidate();
    },

    onError: (error) => {
      toast.error("An error occurred");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  return (
    <div className="flex items-center flex-none">
      <Button
        variant="secondary"
        className="rounded-l-full rounded-r-none gap-2 pr-4"
        onClick={() => like.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
      >
        <ThumbsUpIcon
          className={cn("size-5", viewerReactions === "like" && "fill-black")}
        />
        {likes}
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        variant="secondary"
        className="rounded-l-none rounded-r-full pl-3"
        onClick={() => dislike.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
      >
        <ThumbsDownIcon
          className={cn(
            "size-5",
            viewerReactions === "dislike" && "fill-black"
          )}
        />
        {dislikes}
      </Button>
    </div>
  );
};
export default VideoReactions;
