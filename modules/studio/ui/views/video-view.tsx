import React from "react";
import { FormSections } from "../sections/form-sections";

type videoViewProps = {
  videoId: string;
};

const videoViewProps: React.FC<videoViewProps> = ({ videoId }) => {
  return (
    <div className="px-4 pt-2.5 max-w-screen-lg">
      <FormSections videoId={videoId} />
    </div>
  );
};
export default videoViewProps;
