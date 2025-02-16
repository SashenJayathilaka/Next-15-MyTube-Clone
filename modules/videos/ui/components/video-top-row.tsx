import { format, formatDistanceToNow } from "date-fns";
import React, { useMemo } from "react";
import { VideoGetOneOutput } from "../../types";
import VideoDescriptions from "./video-descriptions";
import VideoMenu from "./video-menu";
import VideoOwner from "./video-owner";
import VideoReactions from "./video-reactions";

type VideoTopRowProps = {
  video: VideoGetOneOutput;
};

const VideoTopRow: React.FC<VideoTopRowProps> = ({ video }) => {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(780585);
  }, []);

  const expendedViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "standard",
    }).format(780585);
  }, []);

  const compactDate = useMemo(() => {
    return formatDistanceToNow(video.createdAt, { addSuffix: true });
  }, [video.createdAt]);

  const expendedDate = useMemo(() => {
    return format(video.createdAt, "d MMM yyyy");
  }, [video.createdAt]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="text-xl font-semibold">{video.title}</h1>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <VideoOwner user={video.user} videoId={video.id} />
        <div className="flex overflow-x-auto sm:min-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible pb-2 -mb-2 sm:mb-0 gap-2:">
          <VideoReactions />
          <VideoMenu videoId={video.id} variant="secondary" />
        </div>
      </div>
      <VideoDescriptions
        compactViews={compactViews}
        expendedViews={expendedViews}
        compactDate={compactDate}
        expendedDate={expendedDate}
        description={video.description}
      />
    </div>
  );
};
export default VideoTopRow;
