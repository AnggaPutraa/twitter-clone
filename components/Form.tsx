import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePost from "@/hooks/usePost";
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
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string);

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';
            await axios.post(url, { body });
            toast.success(isComment ? 'Comment Posted' : 'Tweet created');
            setBody('');
            mutatePosts();
            mutatePost();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts, mutatePost, isComment, postId]);

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-4">
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
                                label={isComment ? 'Post' : 'Tweet'}
                                disable={isLoading || !body}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-8">
                    <h1 className="text-white text-2xl text-center font-bold">Welcome to twitter <span className="italic">clone</span></h1>
                    <p className="text-neutral-500 text-center px-4 mb-2">Please be aware that this is not a real Twitter website, but a clone created solely for practice and educational purposes.</p>
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