import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 w-full min-w-0 pt-14 lg:pt-0 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
