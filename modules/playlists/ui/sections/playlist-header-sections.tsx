"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/trpc/client";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

type PlaylistHeaderSectionsProps = {
  playlistId: string;
};

export const PlaylistHeaderSections: React.FC<PlaylistHeaderSectionsProps> = ({
  playlistId,
}) => {
  return (
    <Suspense fallback={<PlaylistHeaderSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <PlaylistHeaderSuspense playlistId={playlistId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const PlaylistHeaderSectionSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
};

const PlaylistHeaderSuspense: React.FC<PlaylistHeaderSectionsProps> = ({
  playlistId,
}) => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const [playlist] = trpc.playList.getOne.useSuspenseQuery({ id: playlistId });

  const remove = trpc.playList.remove.useMutation({
    onSuccess: () => {
      toast.success("Playlist removed");
      utils.playList.getMany.invalidate();
      router.push("/playlists");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{playlist.name}</h1>
        <p className="text-xs text-muted-foreground">Video from the playlist</p>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => remove.mutate({ id: playlistId })}
        disabled={remove.isPending}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};
