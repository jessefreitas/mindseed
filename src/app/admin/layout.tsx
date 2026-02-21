import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex">
            <Sidebar />
            <main className="ml-64 flex-1 flex flex-col min-h-screen relative">
                {children}
            </main>
        </div>
    );
}
