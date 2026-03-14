"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAppRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard");

    return (
        <>
            {!isAppRoute && <Navbar />}
            <main className={!isAppRoute ? "min-h-screen pt-16" : ""}>
                {children}
            </main>
            {!isAppRoute && <Footer />}
        </>
    );
}
