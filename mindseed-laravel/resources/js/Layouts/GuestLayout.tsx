import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#000000] pt-6 sm:justify-center sm:pt-0">
            <div className="mb-8">
                <Link href="/">
                    <ApplicationLogo />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-[#0A0A0A] px-10 py-8 shadow-2xl shadow-[#D4AF37]/5 sm:max-w-md sm:rounded-2xl border border-[#222222]">
                {children}
            </div>
        </div>
    );
}
