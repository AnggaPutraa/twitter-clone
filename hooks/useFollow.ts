import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingId || [];
        console.log(list);
        return list.includes(userId);
    }, [userId, currentUser?.followingId]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            loginModal.onOpen();
        }

        try {
            let request;
            if (isFollowing) {
                request = () => axios.delete('/api/follow', {
                    data: { userId }
                });
            } else {
                request = () => axios.post('/api/follow', { userId });
            }

            await request();
            mutateCurrentUser();
            mutateFetchedUser();
            toast.success(isFollowing ? 'Unfollowed' : 'Followed');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;