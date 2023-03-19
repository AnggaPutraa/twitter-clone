import CommentItem from "./CommentItem";

interface CommentFeedProps {
    comments?: Record<string, any>[],
}

const CommentFeed = ({ comments = [] }: CommentFeedProps) => {
    return (
        <div>
            {comments.map(
                (comment) => (
                    <CommentItem key={comment.id} data={comment} />
                )
            )}
        </div>
    );
}

export default CommentFeed;