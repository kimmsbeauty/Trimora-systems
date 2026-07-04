"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Products", href: "/#pos" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:hello@trimorasystems.com" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-ink-950/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(242,237,224,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-text" onClick={() => setOpen(false)}>
          Trimora Systems
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-text-dim">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-text transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button as="a" href="mailto:hello@trimorasystems.com" size="compact">
            Book a Demo
          </Button>
        </div>

        <button
          className="md:hidden text-text"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-ink-950 border-t border-ink-700 px-6 py-6 flex flex-col gap-5 text-text-dim">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-base hover:text-text transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
