import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { format } from "date-fns";
import { useEffect, useMemo } from "react";
import { BsTwitter } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import NotificationItem from "./notificationitem";

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

    return (
        <div className="flex flex-col">
            {fecthedNotifications?.map(
                (notification: Record<string, any>) => (
                    <NotificationItem notification={notification} />
                )
            )}
        </div>
    );
}

export default NotificationFeed;