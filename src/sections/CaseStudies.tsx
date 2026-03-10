import React, { useRef, useState, useEffect } from 'react';

const CASE_STUDIES = [
    {
        industry: "Agro Tech", metric: "500%", duration: "growth in 5 months", color: "#ff5533", chartPath: "M5,90 Q25,85 45,60 T75,40 T100,10",
        problem: "Strong product-market fit but near-zero digital traction with high ad spend yielding poor returns.",
        execution: ["Full-funnel ownership across Meta and Google Ads.", "Strategic SEO foundation paired with high-intent video content."],
        results: ["500% Revenue Growth", "Established Category Authority"], pdf: "/case-study-agro.pdf",
        quote: "Jeevan had a deep understanding of our brand and our vision. With that, he was also able to find the right product to audience fitment and the best form of content..."
    },
    {
        industry: "Sustainable Lifestyle D2C", metric: "950%", duration: "revenue in 6 months", color: "#00e5a0", chartPath: "M5,95 L25,90 L45,70 L65,40 L85,20 L100,5",
        problem: "Category noise and inconsistent sales with no differentiated strategy for seasonal demand.",
        execution: ["Introduced personalized product lines to strengthen value proposition.", "Deployed tightly segmented Meta Ads timed around seasonal windows."],
        results: ["9.5x Revenue Scaling", "4.5x ROAS Maintained"], pdf: "/case-study-sustainable.pdf",
        quote: "Jeevan had a deep understanding of our brand and our vision. With that, he was also able to find the right product to audience fitment and the best form of content..."
    },
    {
        industry: "Personal Care", metric: "200%", duration: "jump in 90 days", color: "#44ccff", chartPath: "M5,90 C25,90 45,80 65,60 S85,20 100,20",
        problem: "Driving top-of-funnel traffic but visitors weren't buying due to a fragmented customer journey.",
        execution: ["Rebuilt on-site conversion experience through CRO.", "Deployed WhatsApp chat flows to re-engage buyers at key drop-off points."],
        results: ["2x Conversion Lift", "40% Blended CPA Reduction"], pdf: "/case-study-care.pdf",
        quote: "Jeevan had a deep understanding of our brand and our vision. With that, he was also able to find the right product to audience fitment and the best form of content..."
    },
    {
        industry: "Home Decor (Omnichannel)", metric: "Local", duration: "Intent Domination", color: "#7b8cff", chartPath: null,
        problem: "A furniture brand with a showroom and online store that weren't communicating.",
        execution: ["Built omnichannel strategy marrying radius-based Google Ads with GBP optimization.", "Refined geo-posts and review management to dominate local intent."],
        results: ["Consistent Online Sales", "Increased Showroom Footfall"], pdf: "/case-study-furniture.pdf",
        quote: "Jeevan had a deep understanding of our brand and our vision. With that, he was also able to find the right product to audience fitment and the best form of content..."
    }
];

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

function AnimatedChart({ path, color }: { path: string, color: string }) {
    const pathRef = useRef<SVGPathElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.5 });
        if (pathRef.current) observer.observe(pathRef.current);
        return () => observer.disconnect();
    }, []);
    return (
        <div className="relative w-full h-40 mb-10 border-b border-l border-white/10 flex items-end pb-2 pl-4 pr-4">
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d={path + " L100,100 L5,100 Z"} fill={color} className="transition-opacity duration-[2s] ease-in-out delay-500 opacity-10" style={{ opacity: isVisible ? 0.1 : 0 }} />
                <path d={path} fill="none" stroke={color} strokeWidth="3" ref={pathRef} className="transition-all duration-[2s] ease-out" style={{ strokeDasharray: 400, strokeDashoffset: isVisible ? 0 : 400, filter: `drop-shadow(0 0 10px ${color})` }} />
            </svg>
            <span className="absolute -bottom-6 right-0 text-white/40 font-mono text-[9px] uppercase tracking-wider">Growth Cap</span>
            <span className="absolute bottom-0 -left-1 md:-left-12 text-white/40 font-mono text-[9px] uppercase tracking-wider">Month 1</span>
        </div>
    );
}

export default function CaseStudies() {
    // --- FIX START: Logic to detect mobile ---
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    // --- FIX END ---

    return (
        /* FIX APPLIED: Added dynamic background color on mobile only. 
           This 'covers' the glitchy global particles sitting at z-10 
        */
        <section
            id="case-studies-section"
            className={`relative w-full z-20 pb-20 pt-10 pl-10 pr-4 md:px-12 transition-colors duration-500 ${isMobile ? 'bg-[#030712]' : 'bg-transparent'}`}
        >
            <div className="w-full max-w-7xl mx-auto mb-10">
                <FadeInBlock delay="0ms">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400 block mb-2">Selected Work</span>
                    <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight">Case Studies</h2>
                    <div className="w-24 h-1 bg-emerald-500 mt-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                </FadeInBlock>
            </div>

            {CASE_STUDIES.map((cs, i) => (
                <div key={i} className="flex flex-col md:flex-row w-full max-w-7xl mx-auto relative mb-16 md:mb-32 last:mb-0 border-b border-white/5 md:border-none pb-12 md:pb-0">

                    <div className="w-full md:w-1/2 md:sticky md:top-0 h-auto md:h-screen flex flex-col justify-center py-6 md:py-0 md:pr-16">
                        <span className="font-mono text-xs tracking-[0.2em] mb-2 block uppercase font-bold" style={{ color: cs.color }}>{cs.industry}</span>
                        <div className="flex items-baseline gap-4 mb-6">
                            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none" style={{ color: cs.color }}>
                                {isNaN(parseFloat(cs.metric)) ? cs.metric : <Counter target={parseFloat(cs.metric)} suffix="%" duration={3000} />}
                            </h2>
                            <span className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">{cs.duration}</span>
                        </div>
                        {cs.chartPath ? <AnimatedChart path={cs.chartPath} color={cs.color} /> : <div className="h-20 md:h-40 mb-12 flex items-center"><div className="w-full h-[1px] bg-white/10" /></div>}

                        <div className="mt-4">
                            <p className="text-[#facc15] text-[15px] md:text-xl leading-relaxed mb-4 border-l-2 border-[#facc15]/30 pl-6 italic font-medium">
                                "{cs.quote}"
                            </p>
                            <span className="block text-white/50 text-[10px] md:text-sm font-bold tracking-widest uppercase pl-6">— Founder</span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center min-h-0 md:min-h-screen pl-0 md:pl-16 mt-12 md:mt-0">
                        <div className="mb-8">
                            <p className="font-mono text-sm md:text-xl uppercase mb-3 tracking-[0.25em] font-black" style={{ color: cs.color }}>THE PROBLEM</p>
                            <p className="text-slate-300 text-[15px] md:text-lg leading-relaxed">{cs.problem}</p>
                        </div>
                        <div className="mb-8">
                            <p className="font-mono text-sm md:text-xl uppercase mb-3 tracking-[0.25em] font-black" style={{ color: cs.color }}>STRATEGIC FIX</p>
                            <ul className="text-slate-300 space-y-3 md:space-y-4 text-[15px] md:text-lg">
                                {cs.execution.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span style={{ color: cs.color }} className="font-bold">▹</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-10">
                            <p className="font-mono text-sm md:text-xl uppercase mb-3 tracking-[0.25em] font-black" style={{ color: cs.color }}>RESULT HIGHLIGHTS</p>
                            <div className="flex flex-wrap gap-2 md:gap-4">
                                {cs.results.map((res, idx) => (
                                    <span key={idx} className="px-3 py-1.5 md:px-6 md:py-3 border rounded-full text-[11px] md:text-base font-bold" style={{ color: cs.color, borderColor: `${cs.color}40`, backgroundColor: `${cs.color}10` }}>
                                        {res}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <a href={cs.pdf} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center font-bold py-3 md:py-4 px-8 md:px-10 rounded-full border transition-all text-xs md:text-base w-full md:w-auto" style={{ color: cs.color, borderColor: `${cs.color}50` }}>
                            View Full Case Study <span className="ml-2">↗</span>
                        </a>
                    </div>
                </div>
            ))}
        </section>
    );
}