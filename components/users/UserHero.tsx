import useUser from "@/hooks/useUser";
import Image from "next/image";
import Avatar from "../Avatar";

interface UserHeroProps {
    userId: string
}

const UserHero = ({ userId }: UserHeroProps) => {
    const { data: fecthedUser } = useUser(userId);
    return (
        <div>
            <div className="bg-neutral-700 h-48 relative">
                {fecthedUser?.coverImage && (
                    <Image
                        src={fecthedUser.coverImage}
                        fill
                        alt='Cover Image'
                        style={{
                            objectFit: 'cover'
                        }}
                    />
                )}
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    );
}

export default UserHero;