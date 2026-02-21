import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex w-full items-center justify-center rounded-xl border border-transparent bg-[#D4AF37] px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#000000] transition-all duration-300 ease-in-out hover:bg-[#BCA339] shadow-lg shadow-[#D4AF37]/20 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
