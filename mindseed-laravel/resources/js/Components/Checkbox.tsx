import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-[#222222] bg-[#000000] text-[#D4AF37] shadow-sm focus:ring-[#D4AF37] focus:ring-offset-[#0A0A0A] ' +
                className
            }
        />
    );
}
