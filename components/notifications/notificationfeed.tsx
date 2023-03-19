import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { BsTwitter } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

const NotificationFeed = () => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { data: fecthedNotifications, isLoading } = useNotifications(currentUser?.id);

    useEffect(() => {
        mutateCurrentUser();
    }, [mutateCurrentUser]);

    if (isLoading || !fecthedNotifications) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    if (fecthedNotifications.length == 0) {
        return (
            <div className="text-neutral-600 text-center p-6 text-xl">
                No notification
            </div>
        )
    }

    console.log(fecthedNotifications.createdAt);

    return (
        <div className="flex flex-col">
            {fecthedNotifications?.map(
                (notification: Record<string, any>) => (
                    <div key={notification.id} className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800'>
                        <BsTwitter color="white" size={32}/>
                        <p className="text-white">{notification.body}</p>
                    </div>
                )
            )}
        </div>
    );
}

export default NotificationFeed;