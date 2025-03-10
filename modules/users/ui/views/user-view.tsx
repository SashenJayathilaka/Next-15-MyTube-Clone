import React from "react";
import { UserSections } from "../sections/user-sections";
import { VideosSections } from "../sections/videos-sections";

type UserViewProps = {
  userId: string;
};

const UserView: React.FC<UserViewProps> = ({ userId }) => {
  return (
    <div className="flex flex-col max-w-[1300px] px-4 pt-2.5 mx-auto mb-10 gap-y-6">
      <UserSections userId={userId} />
      <VideosSections userId={userId} />
    </div>
  );
};
export default UserView;
