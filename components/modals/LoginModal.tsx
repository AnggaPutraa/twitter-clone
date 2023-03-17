import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = useCallback(
        () => {
            if (isLoading) {
                return;
            }
            loginModal.onClose()
            registerModal.onOpen()
        }, [isLoading, registerModal, loginModal]
    );

    const handleSubmit = useCallback(
        async () => {
            try {
                setIsLoading(true);

                loginModal.onClose();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }, [loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeHolder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeHolder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center ml-4">
            <p>
                First time using Twitter?
                <span onClick={handleToggle} className="text-white cursor-pointer"> Create an Account</span>
            </p>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel="Sign In"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;