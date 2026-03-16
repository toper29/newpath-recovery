import UserSidebar from "@/components/user/UserSidebar";
import UserTopbar from "@/components/user/UserTopbar";
import DailyReminderBanner from "@/components/ui/DailyReminderBanner";
import RelapseIntervention from "@/components/features/RelapseIntervention";
import { SidebarProvider } from "@/components/layout/SidebarContext";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-background text-foreground flex">
                {/* Daily check-in reminder - shows once per session */}
                <DailyReminderBanner />
                <RelapseIntervention />
                {/* Sidebar - Fixes to the left */}
                <UserSidebar />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <UserTopbar />

                {/* Scrollable Main Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#040814]">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
        </SidebarProvider>
    );
}
