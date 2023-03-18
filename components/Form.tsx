import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Avatar from "./Avatar";
import Button from "./Button";

interface FormProps {
    placeholder: string,
    isComment?: boolean,
    postId?: string,
}

const Form = ({ placeholder, isComment, postId }: FormProps) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePost } = usePosts();

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            console.log(body);
            await axios.post('/api/posts', { body })
            toast.success('Tweet created');
            setBody('');
            mutatePost();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePost]);

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className="flex flex-row gap-4">
                    <Avatar userId={currentUser?.id} />
                    <div className="w-full">
                        <textarea
                            disabled={isLoading}
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            placeholder={placeholder}
                            className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black 
                            ring-0 outline-none text-[20px] placeholder-neutral-500 text-white'
                        />
                        <hr
                            className="opacity-0 peer-focus:opacity-100 h-[1px] w-full 
                        border-neutral-800 transition"
                        />
                        <div className="mt-4 flex flex-row justify-end">
                            <Button
                                label="Tweet"
                                disable={isLoading || !body}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-8">
                    <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to twitter</h1>
                    <div className="flex flex-row  justify-center gap-4">
                        <Button
                            label="Login"
                            onClick={loginModal.onOpen}
                        />
                        <Button
                            label="Register"
                            onClick={registerModal.onOpen}
                            secondary
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Form;