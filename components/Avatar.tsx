import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface AvatarProps {
    userId: string;
    isLarge?: boolean,
    hasBorder?: boolean,
}

const Avatar = ({
    userId,
    isLarge,
    hasBorder
}: AvatarProps) => {
    const router = useRouter();
    const { data: fetchUser } = useUser(userId);
    const handleClick = useCallback((event: any) => {
        event.stopPropagation();
        const url = `/user/${userId}`;
        router.push(url);
    }, [router, userId]);
    return (
        <div className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-10'}
        ${isLarge ? 'w-32' : 'w-10'}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
        `}>
            <Image
            fill
            style={{
                objectFit: 'cover',
                borderRadius: '100%'
            }}
            alt='Avatar'
            onClick={handleClick}
            src={fetchUser?.profileImage || '/images/placeholder.png'}
            />
        </div>
    );
}

export default Avatar;