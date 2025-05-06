import React from 'react';
import { Heart, Twitter, Instagram, MessageCircle, ExternalLink, Mail, Code } from 'lucide-react';
import { FooterData, FooterLinkProps, FooterListItemProps, SocialLinkProps } from '@/types/footerTypes';
import { ROUTES } from "@/routes";


const FOOTER_DATA: FooterData = {
    explore: [
        { label: "Top 100 Anime", href: ROUTES.ANIME.TOP_100 },
        { label: "Trending This Season", href:ROUTES.ANIME.TRENDING   },
        { label: "Seasonal Charts", href: ROUTES.ANIME.SEASONAL },
        { label: "Browse by Genre", href: "/genres" },
        { label: "Studios", href: "/studios" }
    ],
    help: [
        { label: "About Us", href: "/about" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact Support", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" }
    ],
    social: [
        { icon: <Twitter size={20} className="text-blue-400" />, href: "https://twitter.com/otakurealm", label: "Twitter" },
        { icon: <Instagram size={20} className="text-pink-400" />, href: "https://instagram.com/otakurealm", label: "Instagram" },
        { icon: <MessageCircle size={20} className="text-indigo-400" />, href: "https://discord.gg/otakurealm", label: "Discord" },
        { icon: <Code size={20} className="text-gray-300" />, href: "https://github.com/otakurealm", label: "GitHub" }
    ],
    apps: [
        { label: "App Store", href: "#" },
        { label: "Google Play", href: "#" }
    ]
};

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, className = "" }) => (
    <a
        href={href}
        className={`text-gray-300 hover:text-purple-400 transition-colors duration-200 ${className}`}
    >
        {children}
    </a>
);

const FooterListItem: React.FC<FooterListItemProps> = ({ href, children }) => (
    <li>
        <FooterLink href={href} className="flex items-center gap-2">
            <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
            {children}
        </FooterLink>
    </li>
);

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
    <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-purple-900 transition-colors duration-200"
    >
        {icon}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-tr from-gray-900 to-gray-800 dark:from-black dark:to-gray-900  text-white py-12">
            <div className="relative w-full overflow-hidden">
                <svg className="absolute bottom-0 left-0 w-full transform rotate-180 translate-y-px"
                    viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white/5"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Heart size={24} className="text-pink-500" />
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                                Otaku.Realm
                            </h2>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your ultimate destination for all things anime. Track your favorites, discover new series, and connect with fellow otakus in our thriving community.
                        </p>
                        <div className="pt-4">
                            <FooterLink href="/newsletter" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors duration-200 text-sm font-medium">
                                <Mail size={16} />
                                Join Our Newsletter
                            </FooterLink>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-gray-100">Explore</h3>
                        <ul className="space-y-3">
                            {FOOTER_DATA.explore.map((item, index) => (
                                <FooterListItem key={index} href={item.href}>
                                    {item.label}
                                </FooterListItem>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-gray-100">Help & About</h3>
                        <ul className="space-y-3">
                            {FOOTER_DATA.help.map((item, index) => (
                                <FooterListItem key={index} href={item.href}>
                                    {item.label}
                                </FooterListItem>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-gray-100">Connect With Us</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {FOOTER_DATA.social.map((item, index) => (
                                <SocialLink
                                    key={index}
                                    href={item.href}
                                    icon={item.icon}
                                    label={item.label}
                                />
                            ))}
                        </div>

                        <div className="mt-6">
                            <p className="text-sm text-gray-400 mb-2">Get Our Mobile App</p>
                            <div className="flex gap-2">
                                {FOOTER_DATA.apps.map((app, index) => (
                                    <FooterLink
                                        key={index}
                                        href={app.href}
                                        className="bg-gray-800 hover:bg-purple-900 transition-colors duration-200 rounded-md px-3 py-2 flex items-center text-xs"
                                    >
                                        <span>{app.label}</span>
                                    </FooterLink>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-400">
                        © 2025 Otaku.Realm. All rights reserved.
                    </div>

                    <div className="text-sm text-gray-400 mt-4 md:mt-0 flex items-center gap-2">
                        Powered by
                        <FooterLink
                            href="https://anilist.co"
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                            AniList API
                            <ExternalLink size={12} />
                        </FooterLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;