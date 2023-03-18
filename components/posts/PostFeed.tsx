import usePosts from "@/hooks/usePosts";

interface PostFeedProps {
    userId?: string
}

const PostFeed = ({ userId }: PostFeedProps) => {
    const { data: posts = [] } = usePosts();
    console.log(posts);
    return (
        <>
            {posts.map(
                (user: Record<string, any>) => (
                    <div></div>
                )
            )}
        </>
    );
}

export default PostFeed;