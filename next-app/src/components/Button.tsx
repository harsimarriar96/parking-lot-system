import { ReactNode } from "react";

type Props = {
    onClick?: () => void;
    children?: ReactNode
}

export const Button = ({onClick, children}: Props) => {
    return(<button onClick={onClick} className="bg-blue-700 px-8 py-2 rounded-md text-white">
        {children}
    </button>)
}