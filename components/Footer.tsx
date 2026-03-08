import React from "react";
import appIcon from "../fullstacked-v1.png";

const Footer: React.FC = () => {
    return (
        <footer className="container mx-auto px-8 py-16 border-t border-white/10 mt-16 text-center animate-fade-in [animation-delay:400ms]">
            <div className="flex flex-col gap-10 items-center">
                <div className="flex items-center justify-center">
                    <img src={appIcon} alt="FullStacked Logo" className="w-10 h-10 rounded-xl shadow-sm shadow-sky-500/20 opacity-80 transition-all duration-300" />
                </div>
                <div className="flex gap-8 text-sm text-white/60">
                    <a
                        href="https://x.com/fullstacked"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-400 transition-colors flex items-center"
                        aria-label="X (formerly Twitter)"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-[1.2rem] h-[1.2rem]"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/fullstackedorg/fullstacked/tree/v1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-400 transition-colors flex items-center"
                        aria-label="GitHub"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-[1.2rem] h-[1.2rem]"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-between w-full max-w-lg mt-8 text-xs opacity-50 font-sans tracking-wider uppercase">
                    <p>&copy; {new Date().getFullYear()} FullStacked.</p>
                    <a
                        href="https://docs.fullstacked.org/privacy-policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-400 hover:opacity-100 transition-all"
                    >
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
