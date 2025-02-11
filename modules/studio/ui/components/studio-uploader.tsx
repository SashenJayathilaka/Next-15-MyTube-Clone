import MuxUploader from "@mux/mux-uploader-react";

type Props = {
  endPoint?: string | null;
  onSuccess: () => void;
};

function StudioUploader({}: /* onSuccess, endPoint */ Props) {
  return (
    <div>
      <MuxUploader />
    </div>
  );
}

export default StudioUploader;
