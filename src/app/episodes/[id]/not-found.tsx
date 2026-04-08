import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Episode Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the episode you're looking for. It may not exist yet or the episode number might be incorrect.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-600 transition-colors"
        >
          Back to Episodes
        </Link>
      </div>
    </div>
  );
}