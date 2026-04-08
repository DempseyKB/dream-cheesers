export const metadata = {
  title: 'Random Thoughts - Dream Cheesers',
  description: 'Random thoughts from the Dream Cheesers podcast',
};

export default function RandomThoughtsPage() {
  return (
    <div className="min-h-screen bg-dream-navy">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dream-cream mb-4">Random Thoughts</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-dream-pink to-dream-teal mx-auto rounded-full"></div>
        </div>
        <div className="page-content rounded-xl shadow-lg p-8">
          <p className="text-dream-cream/80 text-center text-lg">
            Coming soon! Check back later for random thoughts from the Dream Cheesers podcast.
          </p>
        </div>
      </div>
    </div>
  );
}
