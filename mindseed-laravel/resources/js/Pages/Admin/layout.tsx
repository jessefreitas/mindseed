import Sidebar from "@/Components/MindSeed/Sidebar";
import { Head } from "@inertiajs/react";

export default function AdminLayout({ children, title }: { children: React.ReactNode, title?: string }) {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex">
            {title && <Head title={title} />}
            <Sidebar />
            <main className="ml-64 flex-1 flex flex-col min-h-screen relative">
                {children}
            </main>
        </div>
    );
}
