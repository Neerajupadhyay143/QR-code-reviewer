import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Star, Users } from 'lucide-react';
import { profiles } from '../data/profiles';
import { StarRating } from '../components/StarRating';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <QrCode className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">ReviewQR</h1>
          </div>
          <p className="text-gray-600 mt-2">Scan QR codes to leave reviews for professionals</p>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Simple QR Code Reviews
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with professionals and share your experience. High ratings appear publicly, 
            while constructive feedback is sent privately to help improve services.
          </p>
        </div> */}

        {/* Features */}
        {/* <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <QrCode className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Scan & Review</h3>
            <p className="text-gray-600">Simply scan a QR code to leave a quick review</p>
          </div>
          <div className="text-center p-6">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Display</h3>
            <p className="text-gray-600">4+ star reviews shown publicly, others sent privately</p>
          </div>
          <div className="text-center p-6">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Build Trust</h3>
            <p className="text-gray-600">Help others make informed decisions</p>
          </div>
        </div> */}

        {/* Demo Profiles */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Demo Profiles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                to={`/profile/${profile.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 group-hover:border-blue-200 transition-colors"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {profile.name}
                    </h4>
                    <p className="text-blue-600 font-medium text-sm">{profile.title}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {profile.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StarRating rating={Math.round(profile.averageRating)} readonly size="small" />
                    <span className="text-sm text-gray-600">
                      {profile.averageRating > 0 ? profile.averageRating.toFixed(1) : 'No ratings'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {profile.totalReviews} reviews
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        {/* <div className="text-center bg-blue-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Try the Demo</h3>
          <p className="text-blue-100 mb-6">
            Click on any profile above to see their reviews and QR code, or scan a QR code to leave a review!
          </p>
          <div className="text-sm text-blue-200">
            <p>💡 Tip: You can scan the QR codes with your phone's camera app</p>
          </div>
        </div> */}
      </main>
    </div>
  );
};