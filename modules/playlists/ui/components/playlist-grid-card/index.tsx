import { PlaylistGetManyOutput } from "@/modules/playlists/type";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import Link from "next/link";
import React from "react";
import PlaylistInfo, { PlaylistInfoSkeletons } from "./playlist-info";
import PlaylistThumbnail, {
  PlaylistThumbnailSkeleton,
} from "./playlist-thumbnail";

type PlaylistGridCardProps = {
  data: PlaylistGetManyOutput["items"][number];
};

export const PlaylistGridCardSkeletons = () => {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <PlaylistThumbnailSkeleton />
      <PlaylistInfoSkeletons />
    </div>
  );
};

const PlaylistGridCard: React.FC<PlaylistGridCardProps> = ({ data }) => {
  return (
    <Link href={`playlists/${data.id}`}>
      <div className="flex flex-col gap-2 w-full group">
        <PlaylistThumbnail
          imageUrl={THUMBNAIL_FALLBACK}
          title={data.name}
          videoCount={data.videoCount}
        />
        <PlaylistInfo data={data} />
      </div>
    </Link>
  );
};
export default PlaylistGridCard;
