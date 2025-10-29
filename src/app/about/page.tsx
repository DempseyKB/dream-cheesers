export const metadata = {
  title: 'About - Dream Cheesers',
  description: 'Learn more about the Dream Cheesers podcast and our mission',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Dream Cheesers
          </h1>
          <p className="text-lg text-gray-600">
            Discover the story behind the podcast that's changing the way we think about dreams and cheese.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Dream Cheesers is more than just a podcast – it's a journey into the extraordinary world where 
            dreams meet the art of cheese-making. We believe that every great cheese has a story, and every 
            dreamer has a vision worth sharing.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Through engaging conversations, expert interviews, and immersive storytelling, we explore the 
            intersection of creativity, craftsmanship, and the pursuit of dreams in the culinary world.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Join Our Community</h3>
          <p className="text-gray-700 mb-4">
            Be part of a growing community of food enthusiasts, dreamers, and cheese lovers who 
            share a passion for authentic storytelling and artisanal craftsmanship.
          </p>
          <div className="space-y-2">
            <a href="#" className="flex items-center text-purple-700 hover:text-purple-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Follow us on social media
            </a>
            <a href="#" className="flex items-center text-purple-700 hover:text-purple-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Subscribe to our newsletter
            </a>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join the Journey?</h3>
          <p className="text-gray-700 mb-6">
            Subscribe to Dream Cheesers and be the first to hear our latest episodes, 
            behind-the-scenes content, and exclusive interviews.
          </p>
          <button className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-600 transition-colors">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}