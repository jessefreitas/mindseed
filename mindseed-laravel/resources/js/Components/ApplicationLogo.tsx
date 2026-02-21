import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A67C00] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
                <i className="fa-solid fa-leaf text-black text-xl"></i>
            </div>
            <div>
                <h1 className="font-bold text-2xl tracking-wider text-[#F5F3EE]">MINDSEED</h1>
                <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">Inteligência Preditiva</p>
            </div>
        </div>
    );
}
