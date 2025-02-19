"use client";

import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import CommentItem from "@/modules/comments/ui/components/comment-item";
import CommentsForm from "@/modules/comments/ui/components/comments-form";
import { trpc } from "@/trpc/client";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type CommentsSectionsProps = {
  videoId: string;
};

export const commentsSections = ({ videoId }: CommentsSectionsProps) => {
  <Suspense fallback={<CommentsSectionsSkeleton />}>
    <ErrorBoundary fallback={<p>Error</p>}>
      <CommentsSectionsSuspense videoId={videoId} />
    </ErrorBoundary>
  </Suspense>;
};

const CommentsSectionsSkeleton = () => {
  return (
    <div className="mt-6 flex justify-center items-center">
      <Loader2Icon className="text-muted-foreground size-7 animate-spin" />
    </div>
  );
};

const CommentsSectionsSuspense: React.FC<CommentsSectionsProps> = ({
  videoId,
}) => {
  const [comments, query] = trpc.comments.getMany.useSuspenseInfiniteQuery(
    {
      videoId: videoId,
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold">
          {comments.pages[0].totalCount} Comments
        </h1>
        <CommentsForm videoId={videoId} />
        <div className="flex flex-col gap-4 mt-2">
          {comments.pages
            .flatMap((page) => page.items)
            .map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          <InfiniteScroll
            isManual
            hasNextPage={query.hasNextPage}
            isFetchingNextPage={query.isFetchNextPageError}
            fetchNextPage={query.fetchNextPage}
          />
        </div>
      </div>
    </div>
  );
};
export default CommentsSectionsSuspense;
