import React from "react";
import Peoplebar from "./layout/Peoplebar";
import Sidebar from "./layout/Sidebar";

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <main className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                    <Sidebar />
                    <div className="
                        col-span-3
                        lg:col-span-2
                        border-x-[1px]
                        border-neutral-800
                    ">
                        {children}
                    </div>
                    <Peoplebar />
                </div>
            </div>
        </main>
    );
}

export default Layout;