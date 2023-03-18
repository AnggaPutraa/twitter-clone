import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
    userId?: string
}

const PostFeed = ({ userId }: PostFeedProps) => {
    console.log(userId);
    const { data: posts = [] } = usePosts(userId);
    console.log(posts);
    return (
        <>
            {posts.map(
                (post: Record<string, any>) => (
                    <PostItem
                        key={post.id}
                        userId={userId}
                        data={post}
                    />
                )
            )}
        </>
    );
}

export default PostFeed;