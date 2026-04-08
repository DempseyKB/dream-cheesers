'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { name: 'Episodes', href: '/' },
  { name: 'Random Thoughts', href: '/random-thoughts' },
  { name: 'Menagerie', href: '/menagerie' },
  { name: 'About Us', href: '#' },
  { name: 'Contact Us', href: '#' },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="border-t border-dream-teal/20 bg-dream-navy/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const isDisabled = item.href === '#';
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                  isActive
                    ? 'text-dream-navy bg-dream-pink shadow-lg'
                    : isDisabled
                    ? 'text-dream-cream/50 cursor-not-allowed'
                    : 'text-dream-cream hover:text-dream-yellow hover:bg-dream-teal/10'
                }`}
                onClick={(e) => isDisabled && e.preventDefault()}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
