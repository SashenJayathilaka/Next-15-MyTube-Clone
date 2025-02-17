import { trpc } from "@/trpc/client";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

interface UseSubscriptionsProps {
  userId: string;
  isSubscribed: boolean;
  formVideoId?: string;
}

export const useSubscriptions = ({
  isSubscribed,
  userId,
  formVideoId,
}: UseSubscriptionsProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const subscribe = trpc.subscriptions.create.useMutation({
    onSuccess: () => {
      toast.success("Subscribed");

      if (formVideoId) {
        utils.videos.getOne.invalidate({ id: formVideoId });
      }
    },
    onError: (error) => {
      toast.error("An error occurred");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });
  const unsubscribe = trpc.subscriptions.remove.useMutation({
    onSuccess: () => {
      toast.success("Unsubscribed");

      if (formVideoId) {
        utils.videos.getOne.invalidate({ id: formVideoId });
      }
    },
    onError: (error) => {
      toast.error("An error occurred");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });
  const isPending = subscribe.isPending || unsubscribe.isPending;

  const onClick = () => {
    if (isSubscribed) {
      unsubscribe.mutate({ userId });
    } else {
      subscribe.mutate({ userId });
    }
  };

  return {
    isPending,
    onClick,
  };
};
