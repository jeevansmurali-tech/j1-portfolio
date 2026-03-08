
const TOOLS = [
    { name: 'Meta', type: 'cdn', icon: 'meta' },
    { name: 'Google Ads', type: 'cdn', icon: 'googleads' },
    { name: 'Shopify', type: 'cdn', icon: 'shopify' },
    { name: 'GA4', type: 'cdn', icon: 'googleanalytics' },
    { name: 'Gemini', type: 'cdn', icon: 'googlegemini' },
    { name: 'Claude', type: 'cdn', icon: 'anthropic', color: 'white' },
    { name: 'Merchant Center', type: 'local', icon: '/logos/gmc.svg' },
    { name: 'Clarity', type: 'local', icon: '/logos/clarity.svg' },
    { name: 'Antigravity', type: 'local', icon: '/logos/antigravity.svg' },
    { name: 'Google Whisk', type: 'local', icon: '/logos/whisk.svg' }
];

const CORE_SKILLS = [
    {
        tag: "Performance",
        title: "Paid Media & Growth",
        desc: "Revenue-focused acquisition across paid channels — built to scale and optimised to convert.",
        color: "#ef4464",
        skills: ["Meta Ads", "Google Ads", "Catalog Mgmt", "CRO", "Lead Gen"]
    },
    {
        tag: "Strategy",
        title: "Strategy & Intelligence",
        desc: "Market positioning, full-funnel planning, and audience architecture — turning insight into an edge.",
        color: "#818cf8",
        skills: ["GTM Strategy", "Positioning", "Funnel Arch", "Analytics"]
    },
    {
        tag: "Commerce",
        title: "Commerce & Infrastructure",
        desc: "End-to-end e-commerce build-out — from store architecture to organic visibility.",
        color: "#14d2aa",
        skills: ["Store Build", "SEO", "Social Content", "Partner Mgmt"]
    }
];

interface CoreExpertiseProps {
    pinProgress: number;
    contentOpacity: number;
}

export default function CoreExpertise({ pinProgress, contentOpacity }: CoreExpertiseProps) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center px-4 md:px-8" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>

            {/* Header Section */}
            <div className="w-full max-w-7xl text-center z-10 transition-opacity mb-2 md:mb-8 shrink-0"
                style={{ transform: `translateY(${pinProgress * -20}px)`, opacity: contentOpacity }}>
                <span className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-[11px] mb-2 block">Core Expertise</span>
                <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                    Full-Funnel Growth <br className="md:hidden" /> Infrastructure
                </h2>
            </div>

            {/* Cards Container - Mobile: Swipeable Carousel | Desktop: Grid */}
            <div className="w-full max-w-7xl z-20 flex flex-col gap-4 md:gap-6 shrink-0"
                style={{ opacity: contentOpacity, transform: `translateY(${Math.max(0, 20 - Math.max(0, (pinProgress - 0.25) * 100))}px)` }}>

                <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 w-full overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory no-scrollbar shrink-0">
                    {CORE_SKILLS.map((skill, idx) => (
                        <div key={idx}
                            className="min-w-[85vw] md:min-w-0 snap-center bg-slate-900/60 backdrop-blur-xl border p-5 md:p-7 rounded-2xl flex flex-col"
                            style={{ borderColor: `${skill.color}30` }}>
                            <div className="flex items-center gap-3 mb-3 md:mb-4">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }} />
                                <h4 className="font-mono text-[11px] md:text-[12px] tracking-[0.2em] uppercase font-bold" style={{ color: skill.color }}>{skill.tag}</h4>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{skill.title}</h3>
                            <p className="text-slate-400 text-[13px] md:text-xs mb-4 md:mb-6 leading-relaxed">{skill.desc}</p>

                            <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                                {skill.skills.map((s, i) => (
                                    <span key={i} className="px-2 md:px-2.5 py-1 rounded-full text-[10px] md:text-[12.5px] font-bold border whitespace-nowrap"
                                        style={{ backgroundColor: `${skill.color}10`, color: skill.color, borderColor: `${skill.color}20` }}>{s}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tools/Stack Section */}
                <div className="w-full pt-4 md:pt-6 border-t border-slate-800/50 flex flex-col items-center shrink-0">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-3xl">
                        {TOOLS.map((tool) => (
                            <div key={tool.name} className="group flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-900/40 border border-slate-700/50 hover:border-emerald-500/50 transition-all cursor-default">
                                <img src={tool.type === 'cdn' ? `https://cdn.simpleicons.org/${tool.icon}${tool.color ? `/${tool.color}` : ''}` : tool.icon}
                                    alt={tool.name}
                                    className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-70 group-hover:opacity-100 transition-all duration-300"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                <span className="text-slate-400 text-[10px] md:text-xs font-medium group-hover:text-emerald-50 transition-colors">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}