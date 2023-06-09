
interface ButtonProps {
    label: string,
    secondary?: boolean,
    fullWidth?: boolean,
    large?: boolean,
    disable?: boolean,
    outline?: boolean,
    onClick: () => void,
}

const Button = ({
    label,
    secondary,
    fullWidth,
    large,
    disable,
    outline,
    onClick,
}: ButtonProps) => {
    return (
        <button
            disabled={disable}
            onClick={onClick}
            className={`
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-full
                font-semibold
                hover:opacity-80
                transition
                border-2
                ${fullWidth ? 'w-full' : 'w-fit'}
                ${secondary ? 'bg-white' : 'bg-sky-500'}
                ${secondary ? 'text-black' : 'text-white'}
                ${secondary ? 'border-black' : 'border-sky-500'}
                ${large ? 'text-xl' : 'text-md'}
                ${large ? 'px-4' : 'px-3'}
                ${large ? 'py-2' : 'py-1'}
                ${outline ? 'bg-transparent' : ''}
                ${outline ? 'border-white' : ''}
                ${outline ? 'text-white' : ''}
        `}>
            {label}
        </button>
    );
}

export default Button;