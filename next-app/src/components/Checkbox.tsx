import { Children, ReactNode } from "react";

type Props = {
    isChecked: boolean;
    onClick?: () => void;
    children?: ReactNode;
}

export const Checkbox = ({isChecked, onClick, children}: Props) => {
    return(<div className={`flex flex-col justify-center items-center cursor-pointer px-4 py-4 border-blue-500 border-4 h-80 w-80 rounded-md ${isChecked ? 'bg-blue-500 text-white' : ''}`} onClick={onClick}>
        {children}
    </div>)
}