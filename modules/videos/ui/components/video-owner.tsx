import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import SubscriptionButton from "@/modules/subscription/ui/components/subscription-button";
import UserInfo from "@/modules/users/ui/components/user-info";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { VideoGetOneOutput } from "../../types";

type VideoOwnerProps = {
  user: VideoGetOneOutput["user"];
  videoId: string;
};

const VideoOwner: React.FC<VideoOwnerProps> = ({ user, videoId }) => {
  const { userId } = useAuth();

  return (
    <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
      <Link href={`users/${user.id}`}>
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar size="lg" imageUrl={user.imageUrl} name={user.name} />
          <div className="flex flex-col gap-1 min-w-0">
            <UserInfo size="lg" name={user.name} />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {0} subscribers
            </span>
          </div>
        </div>
      </Link>
      {userId === user.clerkId ? (
        <Button className="rounded-full" variant="secondary" asChild>
          <Link href={`/studio/videos/${videoId}`}>Edit Video</Link>
        </Button>
      ) : (
        <SubscriptionButton
          onClick={() => {}}
          disabled={false}
          isSubscribed={false}
          className="flex-none"
        />
      )}
    </div>
  );
};
export default VideoOwner;
