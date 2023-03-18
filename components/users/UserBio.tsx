import { format } from 'date-fns'
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useMemo } from 'react';
import Button from '../Button';
import { BiCalendar } from 'react-icons/bi';
import useEditModal from '@/hooks/useEditModal';

interface UserBioProps {
    userId: string
}

const UserBio = ({ userId }: UserBioProps) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fecthedUser } = useUser(userId);
    const editModal = useEditModal();

    const createdAt = useMemo(() => {
        if (!fecthedUser?.createdAt) {
            return null;
        }
        return format(new Date(fecthedUser.createdAt), 'MMMM yyyy')
    }, [fecthedUser?.createdAt]);

    return (
        <div className='border-b-[1px] border-neutral-800 pb-4'>
            <div className='flex justify-end items-center p-2'>
                {currentUser?.id == userId ? (
                    <Button
                        secondary
                        label='Edit'
                        onClick={() => {editModal.onOpen()}}
                    />
                ) : (
                    <Button
                        secondary
                        label='Follow'
                        onClick={() => { }}
                    />
                )}
            </div>
            <div className='mt-8 px-4'>
                <div className='flex flex-col'>
                    <p className='text-white text-2xl font-semibold'>
                        {fecthedUser?.name}
                    </p>
                    <p className='text-md text-neutral-500'>
                        @{fecthedUser?.username}
                    </p>
                </div>
                <div className='flex flex-col mt-4'>
                    <p className='text-white'>
                        {fecthedUser?.bio}
                    </p>
                    <div className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
                        <BiCalendar
                            size={24}
                        />
                        <p>Joined {createdAt}</p>
                    </div>
                </div>
                <div className='flex flex-row items-center mt-4 gap-6'>
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-white'>
                            {fecthedUser?.followingId?.length}
                        </p>
                        <p className='text-neutral-500'>
                            Following
                        </p>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-white'>
                            {fecthedUser?.followersCount || 0}
                        </p>
                        <p className='text-neutral-500'>
                            Follower
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBio;