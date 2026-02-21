import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-1 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
