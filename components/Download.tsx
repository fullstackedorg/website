import React, { useState, useEffect } from "react";
import nodejsIcon from "../icons/nodejs.svg";
import npmIcon from "../icons/npm.svg";
import iosIcon from "../icons/ios.svg";
import macosIcon from "../icons/macos.svg";
import testflightIcon from "../icons/testflight.svg";
import windowsIcon from "../icons/windows.svg";
import microsoftStoreIcon from "../icons/microsoft-store.svg";
import androidIcon from "../icons/android.svg";
import playStoreIcon from "../icons/play-store.svg";
import linuxIcon from "../icons/linux.svg";
import chromebookIcon from "../icons/chromebook.svg";

type OS = "apple" | "windows" | "android" | "linux" | null;
type LinuxArch = "x64" | "arm64";
type LinuxInstallType = "deb" | "tar.xz";
type LinuxToolkit = "gtk" | "qt";

const detectOS = (): OS => {
    if (typeof window === "undefined" || !window.navigator) return null;
    const nav = window.navigator as any;
    const ua = nav.userAgent || "";
    const platform = nav.userAgentData?.platform || nav.platform || "";

    if (/android|cros/i.test(ua) || /android|chrome os/i.test(platform)) {
        return "android";
    }

    if (
        /iphone|ipad|ipod|macintosh|mac os x/i.test(ua) ||
        /mac|ios/i.test(platform) ||
        (/macintel/i.test(platform) && nav.maxTouchPoints > 1)
    ) {
        return "apple";
    }

    if (/windows|win32|win64|wow64/i.test(ua) || /win/i.test(platform)) {
        return "windows";
    }

    if (/linux/i.test(ua) || /linux/i.test(platform)) {
        return "linux";
    }

    return null;
};

const PlatformCard: React.FC<{
    title: string;
    description: React.ReactNode;
    icons: React.ReactNode;
    children?: React.ReactNode;
    comingSoon?: boolean;
}> = ({ title, description, icons, children, comingSoon }) => {
    return (
        <div className={`rounded-xl overflow-hidden border border-white/10 bg-[#060a15] shadow-2xl relative w-full group transition-all duration-300 ${comingSoon ? 'opacity-70 grayscale-[0.5]' : 'hover:border-sky-500/50 hover:shadow-sky-500/10 hover:-translate-y-1'} flex flex-col h-full`}>
            {comingSoon && (
                <div className="absolute top-4 right-4 bg-white/10 text-white/60 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    Coming Soon
                </div>
            )}
            <div className={`p-8 flex-1 flex flex-col ${comingSoon ? 'opacity-50' : ''}`}>
                <div className="flex gap-5 mb-6 items-center min-h-[2.5rem]">
                    {icons}
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-3 flex items-center gap-2">
                    {title}
                </h3>
                <div className="text-white/60 text-[0.95rem] leading-relaxed mb-8 flex-1">
                    {description}
                </div>
                <div className="mt-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

interface LinuxModalProps {
    isOpen: boolean;
    onClose: () => void;
    version: string;
    isLoadingVersion: boolean;
}

const LinuxModal: React.FC<LinuxModalProps> = ({ isOpen, onClose, version, isLoadingVersion }) => {
    const [arch, setArch] = useState<LinuxArch>("x64");
    const [installType, setInstallType] = useState<LinuxInstallType>("deb");
    const [toolkit, setToolkit] = useState<LinuxToolkit>("gtk");
    const [depsCopied, setDepsCopied] = useState(false);
    const [debCopied, setDebCopied] = useState(false);

    const filename = `fullstacked-${version}-linux-${arch}-${toolkit}.${installType}`;
    const downloadUrl = `https://files.fullstacked.org/releases/${version}/${filename}`;

    const depsCommand = toolkit === "gtk"
        ? "sudo apt install libgtkmm-4.0-0 libwebkitgtk-6.0-4"
        : "sudo apt install libqt6webenginewidgets6 libqt6webchannel6";

    const debCommand = `sudo apt install ./${filename}\nfullstacked`;

    const handleCopyDeps = () => {
        navigator.clipboard.writeText(depsCommand);
        setDepsCopied(true);
        setTimeout(() => setDepsCopied(false), 2000);
    };

    const handleCopyDeb = () => {
        navigator.clipboard.writeText(debCommand);
        setDebCopied(true);
        setTimeout(() => setDebCopied(false), 2000);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="linux-modal-title"
        >
            <div
                className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#060a15] p-6 sm:p-8 shadow-2xl space-y-6 text-left"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                        <img src={linuxIcon} alt="Linux" className="h-7 w-auto object-contain brightness-0 invert" />
                        <div>
                            <h3 id="linux-modal-title" className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                                Download for Linux
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-white/50">Native application binary</span>
                                <span className="text-[11px] bg-sky-500/20 text-sky-300 font-mono px-2 py-0.5 rounded-full border border-sky-400/30">
                                    {isLoadingVersion ? "fetching..." : `v${version}`}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                        aria-label="Close modal"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Option: Architecture */}
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-white/60 block">Architecture</label>
                    <div className="grid grid-cols-2 gap-2.5">
                        <button
                            type="button"
                            onClick={() => setArch("x64")}
                            className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all text-center flex items-center justify-center gap-2 ${
                                arch === "x64"
                                    ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <span>x86_64</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setArch("arm64")}
                            className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all text-center flex items-center justify-center gap-2 ${
                                arch === "arm64"
                                    ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <span>arm64</span>
                        </button>
                    </div>
                </div>

                {/* Option: Installation Type */}
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-white/60 block">Installation Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                            type="button"
                            onClick={() => setInstallType("deb")}
                            className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all text-left flex flex-col justify-center gap-0.5 ${
                                installType === "deb"
                                    ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <span className="font-semibold">.deb Package</span>
                            <span className="text-xs opacity-70">Recommended for Debian, Ubuntu</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setInstallType("tar.xz")}
                            className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all text-left flex flex-col justify-center gap-0.5 ${
                                installType === "tar.xz"
                                    ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <span className="font-semibold">Standalone (.xz)</span>
                            <span className="text-xs opacity-70">Portable .tar.xz archive</span>
                        </button>
                    </div>
                </div>

                {/* Option: GUI Toolkit */}
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-white/60 block">GUI Toolkit</label>
                    <div className="grid grid-cols-2 gap-2.5">
                        <button
                            type="button"
                            onClick={() => setToolkit("gtk")}
                            className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all text-left flex flex-col justify-center gap-0.5 ${
                                toolkit === "gtk"
                                    ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <span className="font-semibold">GTK</span>
                            <span className="text-xs opacity-70">WebKit engine</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setToolkit("qt")}
                            className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all text-left flex flex-col justify-center gap-0.5 ${
                                toolkit === "qt"
                                    ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            <span className="font-semibold">Qt</span>
                            <span className="text-xs opacity-70">Chromium engine</span>
                        </button>
                    </div>
                </div>

                {/* .deb Package Installation Instructions */}
                {installType === "deb" && (
                    <div className="space-y-2 animate-fade-in bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs">
                        <div className="text-white/80 flex items-center justify-between font-medium">
                            <span>Install &amp; Run</span>
                            <span className="text-[10px] bg-sky-500/20 text-sky-300 font-mono uppercase px-1.5 py-0.5 rounded border border-sky-400/30">
                                APT
                            </span>
                        </div>
                        <div className="bg-[#020617] border border-white/10 rounded-lg p-2.5 font-mono text-xs flex items-start justify-between gap-2 overflow-hidden">
                            <div className="overflow-x-auto whitespace-pre py-0.5 flex-1 scrollbar-thin text-sky-300">
                                {debCommand}
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyDeb}
                                className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded transition-colors mt-0.5 ${
                                    debCopied ? "bg-green-500/10 text-green-400" : "hover:bg-white/10 text-white/40 hover:text-white"
                                }`}
                                title="Copy to clipboard"
                                disabled={debCopied}
                            >
                                {debCopied ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Standalone Dependencies Notice */}
                {installType === "tar.xz" && (
                    <div className="space-y-2 animate-fade-in bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs">
                        <div className="text-white/80 flex items-center justify-between font-medium">
                            <span>Install System Dependencies</span>
                            <span className="text-[10px] bg-sky-500/20 text-sky-300 font-mono uppercase px-1.5 py-0.5 rounded border border-sky-400/30">
                                {toolkit.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-white/50 text-[11px] leading-relaxed">
                            Standalone binaries require these system dependencies to be installed manually:
                        </p>
                        <div className="bg-[#020617] border border-white/10 rounded-lg p-2.5 font-mono text-xs flex items-center justify-between gap-2 overflow-hidden">
                            <div className="overflow-x-auto whitespace-nowrap py-0.5 flex-1 scrollbar-thin">
                                <span className="text-sky-300">{depsCommand}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyDeps}
                                className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded transition-colors ${
                                    depsCopied ? "bg-green-500/10 text-green-400" : "hover:bg-white/10 text-white/40 hover:text-white"
                                }`}
                                title="Copy to clipboard"
                                disabled={depsCopied}
                            >
                                {depsCopied ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Download Button Section */}
                <div className="pt-2 border-t border-white/10">
                    <a
                        href={downloadUrl}
                        download={filename}
                        className="flex items-center justify-center gap-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-center cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download
                    </a>
                </div>
            </div>
        </div>
    );
};

const Download: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const [detectedOS, setDetectedOS] = useState<OS>(() => detectOS());
    const [isLinuxModalOpen, setIsLinuxModalOpen] = useState(false);
    const [linuxVersion, setLinuxVersion] = useState("1.0.0-1780");
    const [isLoadingVersion, setIsLoadingVersion] = useState(false);

    const fetchLatestLinuxVersion = async () => {
        setIsLoadingVersion(true);
        try {
            const res = await fetch("https://files.fullstacked.org/releases/beta.txt");
            if (res.ok) {
                const text = (await res.text()).trim();
                if (text) {
                    setLinuxVersion(text);
                }
            }
        } catch (e) {
            console.error("Failed to fetch latest Linux version", e);
        } finally {
            setIsLoadingVersion(false);
        }
    };

    useEffect(() => {
        setDetectedOS(detectOS());
        fetchLatestLinuxVersion();
    }, []);

    const handleOpenLinuxDialog = () => {
        fetchLatestLinuxVersion();
        setIsLinuxModalOpen(true);
    };

    const getButtonClass = (isPrimary: boolean) =>
        isPrimary
            ? "flex items-center justify-center gap-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
            : "flex items-center justify-center gap-3 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition-colors border border-white/10 hover:border-white/30 cursor-pointer";

    const handleCopy = () => {
        navigator.clipboard.writeText("npm i fullstacked@alpha");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="download" className="container mx-auto px-8 py-24 relative">
            <div className="text-center mb-16 animate-fade-in relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Available <span className="text-sky-400">Platforms</span></h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">Install FullStacked v1 in your projects and download the native apps.</p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Node.js NPM Package */}
                <PlatformCard
                    title="Node.js Package"
                    description={
                        <div className="space-y-4">
                            <p>Available on npm. Install the FullStacked v1 package globally or in your project.</p>
                            <div>
                                <div className="text-xs uppercase tracking-wider font-semibold text-white/40 mb-2">Supported Architectures</div>
                                <div className="flex flex-wrap gap-1.5">
                                    {['darwin-arm64', 'darwin-x64', 'win32-arm64', 'win32-x64', 'linux-arm64', 'linux-x64'].map(arch => (
                                        <span key={arch} className="text-[10px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-white/70 font-mono tracking-wider">
                                            {arch}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    icons={
                        <img src={nodejsIcon} alt="Node.js" className="h-8 w-auto object-contain brightness-0 invert" />
                    }
                >
                    <div className="flex flex-col gap-3 mt-auto">
                        <div className="bg-[#020617] border border-white/10 rounded-lg p-4 font-mono text-sm flex items-center justify-between group-hover:border-sky-500/30 transition-colors">
                            <span className="text-sky-300">npm i fullstacked@alpha</span>
                            <button
                                onClick={handleCopy}
                                className={`flex items-center justify-center w-7 h-7 rounded transition-colors ${copied ? 'bg-green-500/10' : 'hover:bg-white/5 disabled:opacity-50'}`}
                                title="Copy to clipboard"
                                disabled={copied}
                            >
                                {copied ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-400">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/40 hover:text-white transition-colors">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                        <a href="https://www.npmjs.com/package/fullstacked/v/alpha" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2.5 w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-lg transition-colors border border-white/10 hover:border-white/20">
                            <img src={npmIcon} alt="npm" className="h-3.5 w-auto brightness-0 invert opacity-80" />
                            View on npmjs
                        </a>
                    </div>
                </PlatformCard>

                {/* Alpha Apps */}
                <PlatformCard
                    title="Apple Ecosystem"
                    description="Get the FullStacked v1 app on your iPhone, iPad, or Mac via TestFlight."
                    icons={
                        <>
                            <img src={iosIcon} alt="iOS" className="h-6 w-auto object-contain brightness-0 invert" />
                            <img src={macosIcon} alt="macOS" className="h-8 w-auto object-contain brightness-0 invert" />
                        </>
                    }
                >
                    <a href="https://testflight.apple.com/join/CUYvvR4b" target="_blank" rel="noopener noreferrer" className={getButtonClass(detectedOS === "apple" || !detectedOS)}>
                        <img src={testflightIcon} alt="TestFlight" className="w-5 h-5 brightness-0 invert" />
                        Download on TestFlight
                    </a>
                </PlatformCard>

                <PlatformCard
                    title="Windows"
                    description="Get the FullStacked v1 app natively on your Windows device."
                    icons={
                        <img src={windowsIcon} alt="Windows" className="h-7 w-auto object-contain brightness-0 invert" />
                    }
                >
                    <a href="https://apps.microsoft.com/detail/9PFHHQ64415S" target="_blank" rel="noopener noreferrer" className={getButtonClass(detectedOS === "windows")}>
                        <img src={microsoftStoreIcon} alt="Microsoft Store" className="w-5 h-5 brightness-0 invert" />
                        Get from Microsoft Store
                    </a>
                </PlatformCard>

                <PlatformCard
                    title="Android & ChromeOS"
                    description={
                        <div className="space-y-4">
                            <p>Get the FullStacked v1 app on your Android or Chromebook via Play Store:</p>
                            <ol className="space-y-2.5 text-sm">
                                <li className="flex items-start gap-2.5">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-semibold flex items-center justify-center border border-sky-400/30 mt-0.5">1</span>
                                    <div className="flex-1">
                                        <a href="https://groups.google.com/u/0/g/fullstacked" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-400 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1">
                                            Join Google Group
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 opacity-60">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-semibold flex items-center justify-center border border-sky-400/30 mt-0.5">2</span>
                                    <div className="flex-1">
                                        <a href="https://play.google.com/apps/testing/org.fullstacked" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-400 underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1">
                                            Become a Tester
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 opacity-60">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-semibold flex items-center justify-center border border-sky-400/30 mt-0.5">3</span>
                                    <div className="flex-1">
                                        <span className="text-white/80 font-medium">Download on Google Play</span>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    }
                    icons={
                        <>
                            <img src={androidIcon} alt="Android" className="h-7 w-auto object-contain brightness-0 invert" />
                            <img src={chromebookIcon} alt="ChromeOS" className="h-5 w-auto object-contain brightness-0 invert" />
                        </>
                    }
                >
                    <a href="https://play.google.com/store/apps/details?id=org.fullstacked" target="_blank" rel="noopener noreferrer" className={getButtonClass(detectedOS === "android")}>
                        <img src={playStoreIcon} alt="Google Play" className="w-5 h-5 brightness-0 invert" />
                        Get from Google Play
                    </a>
                </PlatformCard>

                <PlatformCard
                    title="Linux"
                    description="Get the FullStacked v1 app natively on your Linux distribution."
                    icons={
                        <img src={linuxIcon} alt="Linux" className="h-8 w-auto object-contain brightness-0 invert" />
                    }
                >
                    <button
                        type="button"
                        onClick={handleOpenLinuxDialog}
                        className={getButtonClass(detectedOS === "linux")}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download for Linux
                    </button>
                </PlatformCard>
            </div>

            {/* Linux Download Dialog Modal */}
            <LinuxModal
                isOpen={isLinuxModalOpen}
                onClose={() => setIsLinuxModalOpen(false)}
                version={linuxVersion}
                isLoadingVersion={isLoadingVersion}
            />
        </section>
    );
};

export default Download;
