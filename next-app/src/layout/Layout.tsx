import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const Layout = ({children}: Props) => {
    return(<div className="h-screen w-full bg-blue-100"><div className="flex flex-col items-center justify-center h-full">{children}</div></div>)
}

export default Layout;