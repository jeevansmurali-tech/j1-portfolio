import React from 'react';

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
            className="fixed z-[100] group flex items-center justify-center transition-all duration-500 ease-out
                       border border-white/10 bg-[#020617]/70 backdrop-blur-md text-emerald-400
                       shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]
                       /* MOBILE: Bottom Center Pill */
                       bottom-6 left-1/2 -translate-x-1/2 h-12 px-6 rounded-full w-max
                       /* DESKTOP: Bottom Right Orb -> Expands to Pill on Hover */
                       md:bottom-10 md:left-auto md:right-10 md:translate-x-0 md:w-14 md:hover:w-[150px] md:h-14 md:px-0 md:hover:px-6 overflow-hidden"
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

            {/* Text Label */}
            <span className="ml-2 font-mono text-[11px] font-bold uppercase tracking-widest whitespace-nowrap
                             /* MOBILE: Always visible */
                             block 
                             /* DESKTOP: Hidden width/opacity until hovered */
                             md:max-w-0 md:opacity-0 md:group-hover:max-w-[100px] md:group-hover:opacity-100
                             transition-all duration-500 ease-out"
            >
                Let's Talk
            </span>
        </button>
    );
}