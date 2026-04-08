import Link from 'next/link';

export default function RandomThoughtNotFound() {
  return (
    <div className="min-h-screen bg-dream-navy flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-dream-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-dream-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-dream-cream mb-2">Random Thought Not Found</h1>
          <p className="text-dream-cream/70 mb-8">
            Sorry, we couldn't find the random thought you're looking for. It may have been moved or doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full bg-dream-teal text-dream-navy px-6 py-3 rounded-lg hover:bg-dream-teal-light transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Episodes
          </Link>
        </div>
      </div>
    </div>
  );
}