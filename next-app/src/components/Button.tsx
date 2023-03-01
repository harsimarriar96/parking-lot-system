import { ReactNode } from "react";

type Props = {
    onClick?: () => void;
    children?: ReactNode,
    isDisabled?: boolean
}

export const Button = ({onClick, children, isDisabled}: Props) => {
    return(<button onClick={onClick} className={`${isDisabled ? 'bg-gray-300 cursor-default' : 'bg-blue-700 cursor-pointer'} px-8 py-2 rounded-md text-white`}>
        {children}
    </button>)
}