import { useRef, useState, useEffect } from 'react';
import ProvenMetrics from './sections/ProvenMetrics';
import CoreExpertise from './sections/CoreExpertise';
import CaseStudies from './sections/CaseStudies';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function ResultsSection() {
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const [pinProgress, setPinProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const handleScroll = () => {
            if (!pinContainerRef.current) return;
            const { top, height } = pinContainerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            setPinProgress(Math.max(0, Math.min(-top / (height - windowHeight), 1)));
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        handleResize();
        handleScroll();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isFixed = pinProgress > 0 && pinProgress < 0.999;
    const isAtBottom = pinProgress >= 0.999;

    // --- FASTER SCROLL MATH FOR MOBILE ---
    // On mobile, we speed up the transitions so the user doesn't get stuck.
    const startFade = isMobile ? 0.02 : 0.05;
    const endFade = isMobile ? 0.40 : 0.35;

    let hookOpacity = 0;
    if (pinProgress > startFade && pinProgress <= 0.15) {
        hookOpacity = (pinProgress - startFade) * 10;
    } else if (pinProgress > 0.15 && pinProgress <= 0.25) {
        hookOpacity = 1;
    } else if (pinProgress > 0.25 && pinProgress <= endFade) {
        hookOpacity = Math.max(0, 1 - (pinProgress - 0.25) * 10);
    }

    let blurOpacity = 0;
    let contentOpacity = 0;

    if (pinProgress > 0.20 && pinProgress <= 0.90) {
        blurOpacity = Math.min(1, (pinProgress - 0.20) * 8);
        contentOpacity = Math.max(0, Math.min(1, (pinProgress - 0.25) * 8));
    } else if (pinProgress > 0.90) {
        blurOpacity = Math.max(0, 1 - (pinProgress - 0.90) * 10);
        contentOpacity = Math.max(0, 1 - (pinProgress - 0.90) * 10);
    }

    return (
        <>
            <ProvenMetrics />

            {/* UPDATED: Mobile uses h-[180vh], Desktop uses h-[400vh] */}
            <section
                id="pinned-hud-section"
                ref={pinContainerRef}
                className={`relative ${isMobile ? 'h-[180vh]' : 'h-[400vh]'} w-full z-10`}
            >
                <div
                    className="fixed inset-0 h-[100dvh] w-screen flex items-center justify-center pointer-events-none z-10 px-4"
                    style={{
                        opacity: hookOpacity,
                        transform: `scale(${1 + pinProgress * (isMobile ? 0.2 : 0.5)})`
                    }}
                >
                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-widest uppercase text-center drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] m-0">
                        So what do I do?
                    </h3>
                </div>

                <div className="fixed inset-0 pointer-events-none" style={{
                    zIndex: 15,
                    opacity: blurOpacity,
                    backgroundColor: 'rgba(2, 6, 23, 0.92)', // Slightly darker for mobile focus
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                }} />

                <div style={{
                    position: isFixed ? 'fixed' : 'absolute',
                    top: isFixed ? 0 : (isAtBottom ? 'auto' : 0),
                    bottom: isAtBottom ? 0 : 'auto',
                    left: 0,
                    right: 0,
                    zIndex: 20
                }}>
                    <CoreExpertise pinProgress={pinProgress} contentOpacity={contentOpacity} />
                </div>
            </section>

            <CaseStudies />
            <Contact />
            <Footer />
        </>
    );
}