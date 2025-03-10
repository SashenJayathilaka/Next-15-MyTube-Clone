import ResponsiveSDialog from "@/components/responsive-dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";
import React from "react";

type BannerUploadModalProps = {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const BannerUploadModal: React.FC<BannerUploadModalProps> = ({
  onOpenChange,
  open,
  userId,
}) => {
  const utils = trpc.useUtils();

  const onUploadCompleat = () => {
    utils.studio.getMany.invalidate();
    utils.users.getOne.invalidate({ id: userId });
    onOpenChange(false);
  };

  return (
    <ResponsiveSDialog
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint="bannerUploader"
        onClientUploadComplete={onUploadCompleat}
      />
    </ResponsiveSDialog>
  );
};
export default BannerUploadModal;
