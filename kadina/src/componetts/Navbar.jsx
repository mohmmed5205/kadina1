import { useState } from "react";
import { navLinks } from "../data/navbar";
import { center } from "../data/center";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <a
                    href="#home"
                    className="text-2xl font-bold text-amber-700"
                >
                    {center.name}
                </a>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className="font-medium text-gray-700 transition hover:text-amber-700"
                        >
                            {link.title}
                        </a>
                    ))}
                </nav>

                {/* WhatsApp */}
                <a
                    href={`https://wa.me/${center.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden rounded-xl bg-amber-700 px-5 py-3 text-white transition hover:bg-amber-800 lg:block"
                >
                    واتساب
                </a>

                {/* Mobile Button */}
                <button
                    className="text-3xl lg:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-t bg-white lg:hidden">
                    <div className="flex flex-col gap-4 p-6">

                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg py-2 text-gray-700 transition hover:bg-gray-100 hover:text-amber-700"
                            >
                                {link.title}
                            </a>
                        ))}

                        <a
                            href={`https://wa.me/${center.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 rounded-xl bg-amber-700 py-3 text-center text-white"
                        >
                            تواصل عبر واتساب
                        </a>

                    </div>
                </div>
            )}
        </header>
    );
}