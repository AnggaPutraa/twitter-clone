import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Modal from "../Modal";
import Input from "../Input";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        console.log('Run use effect');
        console.log(currentUser);
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [
        currentUser?.profileImage,
        currentUser?.coverImage,
        currentUser?.name,
        currentUser?.username,
        currentUser?.bio,
    ]);

    const hanldeSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.patch('/api/edit', {
                name, username, bio, profileImage, coverImage
            });
            mutateFetchedUser();
            toast.success('Profile updated');
            editModal.onClose();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [name, username, profileImage, coverImage, bio, mutateFetchedUser]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeHolder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeHolder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeHolder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title='Edit youre profile'
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={hanldeSubmit}
            body={bodyContent}
        />
    );
}

export default EditModal;