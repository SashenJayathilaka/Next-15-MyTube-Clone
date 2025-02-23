import { Skeleton } from "@/components/ui/skeleton";
import { formatDurations } from "@/lib/utils";
import Image from "next/image";
import { THUMBNAIL_FALLBACK } from "../../constants";

type Props = {
  title: string;
  durations: number;
  imageUrl?: string | null;
  previewUrl?: string | null;
};

export const VideoThumbnailSkeletons = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      <Skeleton className="size-full" />
    </div>
  );
};

function VideoThumbnail({ imageUrl, title, previewUrl, durations }: Props) {
  return (
    <div className="relative group">
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={imageUrl ?? THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="h-full w-full object-cover group-hover:opacity-0:"
        />
        <Image
          unoptimized={!!previewUrl}
          src={previewUrl ?? THUMBNAIL_FALLBACK}
          alt={title}
          fill
          className="h-full w-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        {formatDurations(durations)}
      </div>
    </div>
  );
}

export default VideoThumbnail;
