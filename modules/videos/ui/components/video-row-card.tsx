import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import UserInfo from "@/modules/users/ui/components/user-info";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { useMemo } from "react";
import { VideoGetManyOutput } from "../../types";
import VideoMenu from "./video-menu";
import VideoThumbnail, { VideoThumbnailSkeletons } from "./video-thumbnail";

const videoRowCardVariant = cva("group flex min-w-0", {
  variants: {
    size: {
      default: "gap-4",
      compact: "gap-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const thumbnailVariant = cva("relative flex-none", {
  variants: {
    size: {
      default: "w-[38%]",
      compact: "w-[168px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface VideoRowCardProps extends VariantProps<typeof videoRowCardVariant> {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}

export const VideoRowCardSkeleton = ({
  size = "default",
}: {
  size?: "default" | "compact";
}) => {
  return (
    <div className={videoRowCardVariant({ size })}>
      <div className={thumbnailVariant({ size })}>
        <VideoThumbnailSkeletons />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-x-2">
          <div className="flex-1 min-w-0">
            <Skeleton
              className={cn("h-5 w-[40%]", size === "compact" && "h-4 w-[40%]")}
            />
            {size === "default" && (
              <>
                <Skeleton className="h-4 w-[20%] mt-1" />
                <div className="flex items-center gap-2 my-3">
                  <Skeleton className="size-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </>
            )}
            {size === "compact" && (
              <>
                <Skeleton className="h-4 w-[50%] mt-1" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoRowCard: React.FC<VideoRowCardProps> = ({
  data,
  onRemove,
  size = "default",
}) => {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(data.likeCount);
  }, [data.likeCount]);

  const compactLikes = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(data.viewCount);
  }, [data.viewCount]);

  return (
    <div className={videoRowCardVariant({ size })}>
      <Link
        prefetch
        href={`/videos/${data.id}`}
        className={thumbnailVariant({ size })}
      >
        <VideoThumbnail
          imageUrl={data.thumbnailUrl}
          previewUrl={data.previewUrl}
          title={data.title}
          durations={data.duration}
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-x-2">
          <Link prefetch href={`/videos/${data.id}`} className="flex-1 min-w-0">
            <h3
              className={cn(
                "font-medium line-clamp-1",
                size === "compact" ? "text-sm" : "text-base"
              )}
            >
              {data.title}
            </h3>
            {size === "default" && (
              <p className="text-xs text-muted-foreground mt-1">
                {compactViews} views • {compactLikes} likes
              </p>
            )}
            {size === "default" && (
              <>
                <div className="flex items-center gap-2 my-3">
                  <UserAvatar
                    size="sm"
                    imageUrl={data.user.imageUrl}
                    name={data.user.name}
                  />
                  <UserInfo size="sm" name={data.user.name} />
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-xs text-muted-foreground w-fit line-clamp-4">
                      {data.description ?? "No Description"}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    align="center"
                    className="bg-black/70"
                  >
                    <p>From the video description</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
            {size === "compact" && <UserInfo size="sm" name={data.user.name} />}
            {size === "compact" && (
              <p className="text-xs text-muted-foreground">
                {compactViews} views • {compactLikes} likes
              </p>
            )}
          </Link>
          <div className="flex-none">
            <VideoMenu videoId={data.id} onRemove={onRemove} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoRowCard;
