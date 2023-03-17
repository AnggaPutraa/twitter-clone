import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = useCallback(
        () => {
            if (isLoading) {
                return;
            }
            registerModal.onClose()
            loginModal.onOpen()
        }, [isLoading, registerModal, loginModal]
    );

    const handleSubmit = useCallback(
        async () => {
            try {
                setIsLoading(true);

                registerModal.onClose();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }, [registerModal]
    );

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeHolder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
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
                Already have an account?
                <span onClick={handleToggle} className="text-white cursor-pointer"> Sign In</span>
            </p>

        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Create an Account'
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;