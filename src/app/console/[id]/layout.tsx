import Navbar from "@/components/layout/navbar";
import React from "react";

export default function DynamicConsoleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <main>
                <Navbar />
                {children}
            </main>
        </>
    )
}