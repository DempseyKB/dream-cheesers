export const metadata = {
  title: 'Images - Dream Cheesers',
  description: 'Visual content and gallery from the Dream Cheesers podcast',
};

export default function ImagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Images & Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore visual moments from the Dream Cheesers podcast. Behind the scenes, 
            promotional content, and memorable moments captured in time.
          </p>
        </div>

        {/* Image gallery - placeholder for now */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder image cards */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((image) => (
            <div key={image} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-purple-700 font-medium">Image {image}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Gallery Image {image}
                </h3>
                <p className="text-gray-600 text-sm">
                  A memorable moment from the Dream Cheesers podcast journey.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            More images will be added as we create content. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}