'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { name: 'Episodes', href: '/' },
  { name: 'Images', href: '/images' },
  { name: 'About', href: '/about' },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="text-2xl font-bold text-purple-700">
            Dream Cheesers
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-purple-700 border-b-2 border-purple-700'
                      : 'text-gray-700 hover:text-purple-700'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button - for future implementation */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-purple-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};