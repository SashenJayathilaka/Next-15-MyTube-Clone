import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Edit2Icon } from "lucide-react";
import React, { useState } from "react";
import { UserGetOneOutput } from "../../type";
import BannerUploadModal from "./banner-upload-modal";

type UserPageBannerProps = {
  users: UserGetOneOutput;
};

export const UserPageBannerSkeletons = () => {
  return (
    <div>
      <Skeleton className="w-full max-h-[200px] h-[15vh]" />
    </div>
  );
};

const UserPageBanner: React.FC<UserPageBannerProps> = ({ users }) => {
  const { userId } = useAuth();
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  return (
    <div className="relative group">
      <BannerUploadModal
        userId={users.id}
        open={isBannerModalOpen}
        onOpenChange={setIsBannerModalOpen}
      />
      <div
        className={cn(
          "w-full max-h-[200px] h-[15vh] bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl",
          users.bannerUrl ? "bg-cover bg-center" : "bg-gray-100"
        )}
        style={{
          backgroundImage: users.bannerUrl
            ? `url(${users.bannerUrl}`
            : undefined,
        }}
      >
        {users.clerkId === userId && (
          <Button
            onClick={() => setIsBannerModalOpen(true)}
            type="button"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Edit2Icon className="size-4 text-white" />
          </Button>
        )}
      </div>
    </div>
  );
};
export default UserPageBanner;
