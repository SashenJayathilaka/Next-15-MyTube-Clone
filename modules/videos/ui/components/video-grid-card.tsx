import Link from "next/link";
import React from "react";
import { VideoGetManyOutput } from "../../types";
import VideoInfo from "./video-info";
import VideoThumbnail from "./video-thumbnail";

type VideoGridCardProps = {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
};

const VideoGridCard: React.FC<VideoGridCardProps> = ({ data, onRemove }) => {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <Link href={`/videos/${data.id}`}>
        <VideoThumbnail
          imageUrl={data.thumbnailUrl}
          previewUrl={data.previewUrl}
          title={data.title}
          durations={data.duration}
        />
      </Link>
      <VideoInfo data={data} onRemove={onRemove} />
    </div>
  );
};
export default VideoGridCard;
