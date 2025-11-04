'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigationItems = [
  { name: 'Episodes', href: '/' },
  { name: 'About', href: '/about' },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-dream-navy shadow-lg border-b border-dream-teal/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="w-16 h-16 relative">
              <Image
                src="/DreamCheesersLogo-Transparent.png"
                alt="Dream Cheesers Logo"
                fill
                className="object-contain"
                sizes="64px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-dream-pink group-hover:text-dream-yellow transition-colors duration-300">
                Dream Cheesers
              </span>
              <span className="text-xs text-dream-teal font-medium">
                Podcast
              </span>
            </div>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    isActive
                      ? 'text-dream-navy bg-dream-pink shadow-lg'
                      : 'text-dream-cream hover:text-dream-yellow hover:bg-dream-teal/10'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dream-cream hover:text-dream-pink transition-colors duration-200 p-2"
            >
              <svg 
                className={`h-6 w-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-48 pb-4' : 'max-h-0'
        }`}>
          <div className="space-y-2 pt-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-lg ${
                    isActive
                      ? 'text-dream-navy bg-dream-pink'
                      : 'text-dream-cream hover:text-dream-yellow hover:bg-dream-teal/10'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};