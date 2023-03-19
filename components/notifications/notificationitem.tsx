import { formatDistanceToNowStrict } from "date-fns";
import { useMemo } from "react";
import { BsTwitter } from "react-icons/bs";

interface NotificationItemProps {
    notification: Record<string, any>,
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
    const createdAt = useMemo(() => {
        if (!notification?.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(notification.createdAt));
    }, [notification?.createdAt]);
    return (
        <div>
            <div className='flex flex-row items-center justify-between p-6 gap-4 border-b-[1px] border-neutral-800'>
                <div className="flex flex-row gap-4 items-center">
                    <BsTwitter color="white" size={32} />
                    <p className="text-white">{notification.body}</p>
                </div>
                <p className="text-neutral-500">{createdAt} ago</p>
            </div>
        </div>
    );
}

export default NotificationItem;