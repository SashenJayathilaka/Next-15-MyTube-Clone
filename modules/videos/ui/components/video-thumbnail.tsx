import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  imageUrl?: string | null;
  previewUrl?: string | null;
};

function VideoThumbnail({ imageUrl, title, previewUrl }: Props) {
  return (
    <div className="relative group">
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={imageUrl ?? "placeholder.svg"}
          alt={title}
          fill
          className="h-full w-full object-cover group-hover:opacity-0:"
        />
        <Image
          src={previewUrl ?? "placeholder.svg"}
          alt={title}
          fill
          className="h-full w-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}

export default VideoThumbnail;
