import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { useSubscriptions } from "@/modules/subscription/hooks/use-subscriptions";
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
  const { userId: clerkUserId, isLoaded } = useAuth();
  const { isPending, onClick } = useSubscriptions({
    userId: user.id,
    isSubscribed: user.viewerSubscripted,
    formVideoId: videoId,
  });

  return (
    <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
      <Link prefetch href={`users/${user.id}`}>
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar size="lg" imageUrl={user.imageUrl} name={user.name} />
          <div className="flex flex-col gap-1 min-w-0">
            <UserInfo size="lg" name={user.name} />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {user.subscriberCount} subscribers
            </span>
          </div>
        </div>
      </Link>
      {clerkUserId === user.clerkId ? (
        <Button className="rounded-full" variant="secondary" asChild>
          <Link prefetch href={`/studio/videos/${videoId}`}>
            Edit Video
          </Link>
        </Button>
      ) : (
        <SubscriptionButton
          onClick={onClick}
          disabled={isPending || !isLoaded}
          isSubscribed={user.viewerSubscripted}
          className="flex-none"
        />
      )}
    </div>
  );
};
export default VideoOwner;
