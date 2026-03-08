import React, { useRef, useState, useEffect } from 'react';

function Counter({ target, duration = 3000, suffix = "" }: { target: any, duration?: any, suffix?: any }) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const [hasStarted, setHasStarted] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setHasStarted(true); }, { threshold: 0.5 });
        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (!hasStarted) return;
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(progress * target);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [hasStarted, target, duration]);
    return <span ref={countRef}>{typeof target === 'number' ? (target % 1 === 0 ? Math.floor(count) : count.toFixed(1)) : target}{suffix}</span>;
}

function FadeInBlock({ children, delay = "0ms" }: { children: React.ReactNode, delay?: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.3 });
        if (domRef.current) observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);
    return <div ref={domRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: delay }}>{children}</div>;
}

export default function ProvenMetrics() {
    return (
        <section className="relative min-h-screen py-32 px-8 z-10 flex flex-col items-center justify-center">
            <h2 className="text-white font-bold uppercase tracking-[0.6em] text-3xl mb-20 opacity-90 text-center">Proven Metrics</h2>
            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl relative z-20 mb-32">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-12 rounded-3xl text-center flex flex-col justify-center min-h-[400px]">
                    <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-lg mb-8">Agrotech</h4>
                    <div className="text-7xl font-black text-white mb-4"><Counter target={500} suffix="%" duration={3000} /></div>
                    <p className="text-slate-400 text-lg font-medium italic">Revenue Growth</p>
                </div>
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-12 rounded-3xl text-center flex flex-col justify-center min-h-[400px]">
                    <h4 className="text-sky-400 font-bold uppercase tracking-widest text-lg mb-8">Sustainable Fashion</h4>
                    <div className="text-7xl font-black text-white mb-4"><Counter target={4.5} suffix="x" duration={3000} /></div>
                    <p className="text-slate-400 text-lg font-medium italic">ROAS Maintained</p>
                </div>
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-12 rounded-3xl text-center flex flex-col justify-center min-h-[400px]">
                    <h4 className="text-purple-400 font-bold uppercase tracking-widest text-lg mb-8">Personal Care</h4>
                    <div className="text-7xl font-black text-white mb-4"><Counter target={-40} suffix="%" duration={3000} /></div>
                    <p className="text-slate-400 text-lg font-medium italic">Blended CPA Reduction</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto text-center relative z-20 pb-20">
                <FadeInBlock delay="0ms"><p className="text-slate-400 text-xl md:text-2xl font-medium italic mb-4">But the underrated metric:</p></FadeInBlock>
                <FadeInBlock delay="300ms"><h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">Deep understanding of the <br /><span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">Brand DNA</span></h3></FadeInBlock>
            </div>
        </section>
    );
}