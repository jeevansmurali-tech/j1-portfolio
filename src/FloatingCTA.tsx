export default function FloatingCTA() {
    // This function smoothly scrolls the page down to your contact section
    const scrollToContact = () => {
        const section = document.getElementById('contact-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button
            onClick={scrollToContact}
            className="fixed z-[100] flex items-center justify-center transition-all duration-300 ease-out
                       border border-white/10 bg-[#020617]/70 backdrop-blur-md text-emerald-400
                       shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-105
                       /* SHAPE: Always a pill */
                       h-12 px-6 rounded-full w-max
                       /* POSITION: Bottom-Center on Mobile -> Bottom-Right on Desktop */
                       bottom-6 left-1/2 -translate-x-1/2 md:bottom-10 md:left-auto md:right-10 md:translate-x-0"
        >
            {/* Minimalist Mail Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="flex-shrink-0"
            >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>

            {/* Text Label - Always Visible */}
            <span className="ml-2 font-mono text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
                Let's Talk
            </span>
        </button>
    );
}