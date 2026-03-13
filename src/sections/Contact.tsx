import { InlineWidget } from 'react-calendly';

export default function Contact() {
    return (
        <section id="contact-section" className="relative min-h-screen py-32 px-8 z-10 flex flex-col items-center justify-center">
            <div className="w-full max-w-7xl mx-auto">
                <div className="mb-20">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400 block mb-2">Next Steps</span>
                    <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tight">Let's build the <br />future of your brand.</h2>
                    <div className="w-24 h-1 bg-emerald-500 mt-6 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT COLUMN: CALENDLY WIDGET */}
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 pt-8 pb-4 px-4 rounded-3xl shadow-2xl flex flex-col min-h-[650px] md:min-h-[750px] relative overflow-hidden">
                        {/* Subtle background glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>

                        <div className="px-4 mb-4 relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2 text-emerald-400">Book a Discovery Call</h3>
                            <p className="text-slate-400 text-sm">Pick a time that works for you, and let's map out your growth trajectory.</p>
                        </div>

                        <div className="w-full relative z-10 rounded-xl overflow-hidden min-h-[700px]">
                            <InlineWidget
                                // Make sure this is JUST the clean link. No "?" at the end!
                                url="https://calendly.com/jeevan-s-murali/15min"
                                styles={{ height: '700px', width: '100%' }}
                                pageSettings={{
                                    backgroundColor: '0f172a',
                                    textColor: 'ffffff',
                                    primaryColor: '10b981',
                                    hideGdprBanner: true // Let the library handle hiding the banner
                                }}
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: QUICK CONNECTS */}
                    <div className="flex flex-col gap-6">

                        {/* WhatsApp Card with Icon */}
                        <a href="https://wa.me/916383653185?text=Hi%20Jeevan,%20I'd%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="group bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-emerald-500/30 transition-all flex flex-col justify-center min-h-[220px]">
                            {/* WhatsApp SVG Icon */}
                            <svg className="w-8 h-8 text-emerald-400 mb-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.82 0 6.933 3.111 6.934 6.938-.001 3.828-3.115 6.942-6.934 6.942z" />
                            </svg>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Skip the formalities</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">Want to move fast? Shoot me a text. I reply faster than my campaigns optimize.</p>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-tighter text-sm mt-auto">
                                <span>Chat on WhatsApp</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </a>

                        {/* Email Card with Icon */}
                        <a href="mailto:jeevan.s.murali@gmail.com" className="group bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-emerald-500/30 transition-all flex flex-col justify-center min-h-[220px]">
                            {/* Email SVG Icon */}
                            <svg className="w-8 h-8 text-emerald-400 mb-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">For the Digital Traditionalists</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">Prefer a structured thread? Drop me a formal email and let's talk numbers.</p>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-tighter text-sm mt-auto">
                                <span>Send an Email</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}