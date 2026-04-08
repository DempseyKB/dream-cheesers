import Image from 'next/image';
import { Navigation } from './Navigation';

export const PageHeader: React.FC = () => {
  return (
    <>
      <section className="gradient-dream-primary relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-dream-orange animate-bounce-gentle"></div>
          <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-dream-teal animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-dream-pink animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 py-20 relative">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 relative logo-bounce">
                <Image
                  src="/DreamCheesersLogo-Transparent.png"
                  alt="Dream Cheesers Logo"
                  fill
                  className="object-contain"
                  sizes="96px"
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-dream-pink via-dream-yellow to-dream-teal bg-clip-text">
              Dream Cheesers
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-dream-cream leading-relaxed">
              Join 3 mates as they delve into the rediculous, the absurd and the hilarious.
            </p>
          </div>
        </div>
      </section>
      <Navigation />
    </>
  );
};
