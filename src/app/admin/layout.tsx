import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar - Fixes to the left */}
            <AdminSidebar />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <AdminTopbar />

                {/* Scrollable Main Area */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#040814]">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
