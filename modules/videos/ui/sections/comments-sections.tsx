"use client";

import CommentItem from "@/modules/comments/ui/components/comment-item";
import CommentsForm from "@/modules/comments/ui/components/comments-form";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type CommentsSectionsProps = {
  videoId: string;
};

export const commentsSections = ({ videoId }: CommentsSectionsProps) => {
  <Suspense fallback={<p>Loading...</p>}>
    <ErrorBoundary fallback={<p>Error</p>}>
      <CommentsSectionsSuspense videoId={videoId} />
    </ErrorBoundary>
  </Suspense>;
};

const CommentsSectionsSuspense: React.FC<CommentsSectionsProps> = ({
  videoId,
}) => {
  const [comments] = trpc.comments.getMany.useSuspenseQuery({ videoId });

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-6">
        <h1>{comments.length} Comments</h1>
        <CommentsForm videoId={videoId} />
        <div className="flex flex-col gap-4 mt-2">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CommentsSectionsSuspense;
