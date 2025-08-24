import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Star, ArrowLeft, MessageSquare } from 'lucide-react';
import { Profile } from '../types';
import { StarRating } from '../components/StarRating';
import { ReviewCard } from '../components/ReviewCard';
import { QRCodeDisplay } from '../components/QRCodeDisplay';

export const ProfilePage: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/profiles/${profileId}`);
        if (response.ok) {
          const profileData = await response.json();
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
                  <p className="text-xl text-blue-600 font-medium mb-3">{profile.title}</p>
                  <p className="text-gray-600 leading-relaxed">{profile.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(profile.averageRating)} readonly size="small" />
                  <span className="text-lg font-semibold text-gray-800">
                    {profile.averageRating > 0 ? profile.averageRating.toFixed(1) : 'No ratings'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="w-5 h-5" />
                  <span>{profile.totalReviews} reviews</span>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Public Reviews</h2>
              
              {profile.publicReviews.length > 0 ? (
                <div className="space-y-4">
                  {profile.publicReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg mb-2">No public reviews yet</p>
                  <p className="text-sm">Be the first to leave a review!</p>
                </div>
              )}
            </div>
          </div>

          {/* QR Code */}
          <div>
            <QRCodeDisplay profileId={profile.id} profileName={profile.name} />
          </div>
        </div>
      </div>
    </div>
  );
};