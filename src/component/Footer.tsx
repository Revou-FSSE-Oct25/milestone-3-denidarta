"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-surface-container-high border-t border-outline-variant mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary font-display">
                            Company Logo
                        </h3>
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                            Discover amazing products and exceptional shopping experiences. Quality you can trust, prices you'll love.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-all duration-300 hover:scale-110"
                                aria-label="Facebook">
                                <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
                                    facebook
                                </span>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-all duration-300 hover:scale-110"
                                aria-label="Twitter">
                                <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
                                    tag
                                </span>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-all duration-300 hover:scale-110"
                                aria-label="Instagram">
                                <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
                                    photo_camera
                                </span>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-all duration-300 hover:scale-110"
                                aria-label="LinkedIn">
                                <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
                                    work
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className="space-y-4">
                        <h4 className="text-base font-bold text-on-surface font-display">
                            Shop
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/products"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categories"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/deals"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    Special Deals
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/new-arrivals"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    New Arrivals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h4 className="text-base font-bold text-on-surface font-display">
                            Customer Service
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shipping"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/returns"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    Returns & Exchanges
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h4 className="text-base font-bold text-on-surface font-display">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="material-symbols-rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        chevron_right
                                    </span>
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-outline-variant pt-8 mb-8">
                    <div className="max-w-md mx-auto text-center space-y-4">
                        <h4 className="text-lg font-bold text-on-surface font-display">
                            Stay Updated
                        </h4>
                        <p className="text-sm text-on-surface-variant">
                            Subscribe to our newsletter for exclusive deals and updates
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-full bg-surface-container border border-outline-variant text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                aria-label="Email address"
                            />
                            <button
                                className="px-6 py-3 rounded-full bg-primary text-on-primary font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                                aria-label="Subscribe">
                                Subscribe
                                <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>
                                    send
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-outline-variant pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-on-surface-variant">
                            © {currentYear} Company Name. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/sitemap"
                                className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                                Sitemap
                            </Link>
                            <Link
                                href="/accessibility"
                                className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                                Accessibility
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
