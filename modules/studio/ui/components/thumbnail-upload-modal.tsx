import ResponsiveSDialog from "@/components/responsive-dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";
import React from "react";

type ThumbnailUploadModalProps = {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ThumbnailUploadModal: React.FC<ThumbnailUploadModalProps> = ({
  onOpenChange,
  open,
  videoId,
}) => {
  const utils = trpc.useUtils();

  const onUploadCompleat = () => {
    utils.studio.getMany.invalidate();
    utils.studio.getOne.invalidate({ id: videoId });
    onOpenChange(false);
  };

  return (
    <ResponsiveSDialog
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint="thumbnailUploader"
        input={{ videoId }}
        onClientUploadComplete={onUploadCompleat}
      />
    </ResponsiveSDialog>
  );
};
export default ThumbnailUploadModal;
