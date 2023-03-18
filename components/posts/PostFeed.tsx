import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
    userId?: string
}

const PostFeed = ({ userId }: PostFeedProps) => {
    const { data: posts = [] } = usePosts();
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