import UserAvatar from "@/components/user-avatar";
import Link from "next/link";
import React from "react";
import { CommentsGetManyOutput } from "../../types";

type CommentItemProps = {
  comment: CommentsGetManyOutput[number];
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div>
      <div className="flex gap-4">
        <Link href={`users/${comment.userId}`}>
          <UserAvatar size="lg" imageUrl={comment.user.imageUrl} name="" />
        </Link>
      </div>
    </div>
  );
};
export default CommentItem;
