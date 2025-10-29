import { Hero } from '../components/Hero.jsx';
import { Stats } from '../components/Stats.jsx';
import { getHomepageContent } from '../utils/content.js';

export const metadata = {
  title: 'Dream Cheesers - Home',
  description: 'Welcome to Dream Cheesers - A Next.js website powered by Contentful CMS',
  keywords: 'nextjs, contentful, react, cms',
};

export default async function HomePage() {
  const { hero, stats } = await getHomepageContent();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      {hero && (
        <section>
          <Hero {...hero} />
        </section>
      )}

      {/* Stats Section */}
      {stats && (
        <section>
          <Stats {...stats} />
        </section>
      )}

      {/* Custom Content Section */}
      <section className="px-6 py-16 sm:px-12 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            Welcome to Dream Cheesers
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            This homepage is now built with a traditional Next.js approach, using Contentful 
            content alongside custom React components. You can easily customize this page 
            by editing the components and styling them with CSS or Tailwind classes.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Easy to Customize</h3>
              <p className="text-gray-600">
                Edit components directly in React and style them with your preferred CSS approach.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Contentful Integration</h3>
              <p className="text-gray-600">
                Content is fetched from Contentful and can be easily managed through their CMS.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Next.js Power</h3>
              <p className="text-gray-600">
                Built with Next.js 15 for optimal performance, SEO, and developer experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
