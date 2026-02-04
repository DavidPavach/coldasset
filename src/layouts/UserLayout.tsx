import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

// Libs
import { getAccessToken, getId, getPasscodeAccess } from "@/lib/token";
import { useSocket } from "@/services/socket.service";

// Components
import { BottomNav, SideNav } from "@/components/Nav";
import Header from "@/components/Header";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    
    const navigate = useNavigate();

    const userId = getId();
    const accessToken = getAccessToken();
    const passCodeAccess = getPasscodeAccess();

    useEffect(() => {
        if (!accessToken || !userId || !passCodeAccess) {
            navigate({ to: "/login", replace: true });
        }
    }, [accessToken, userId, passCodeAccess, navigate]);

    useSocket(userId ?? "");

    return (
        <main className="flex flex-col">
            <section className="flex">
                <div className="hidden lg:block lg:w-[20rem]">
                    <SideNav />
                </div>

                <aside className="flex-1 min-w-0">
                    <Header />
                    <section className="mb-20 md:mb-0 p-2 md:p-4 xl:p-6 overflow-y-auto">
                        {children}
                    </section>
                </aside>
            </section>

            <BottomNav />
        </main>
    );
};

export default UserLayout;
