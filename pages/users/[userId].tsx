import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const UserView = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { data: fecthedUser, isLoading } = useUser(userId as string);

    if (isLoading || !fecthedUser) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Header
                label={fecthedUser?.name}
                showBackArrow
            />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            <PostFeed userId={userId as string} />
        </>
    );
}

export default UserView;