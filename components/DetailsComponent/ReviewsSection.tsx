'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Review } from '@/types/animeDetails';

interface ReviewsSectionProps {
  reviews: Review[];
}
const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating / 20);
    const emptyStars = 5 - filledStars;
    
    return (
      <>
        {Array.from({ length: filledStars }).map((_, i) => (
          <Star key={`filled-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-500" />
        ))}
      </>
    );
  };

  return (
    <section id="reviews" className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews</h2>
        <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
          View All
        </Link>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center p-4 bg-gray-200 dark:bg-gray-700">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={review.user.avatar.large}
                  alt={review.user.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <div className="flex-grow">
                <p className="font-medium text-gray-900 dark:text-white">{review.user.name}</p>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {review.ratingAmount} likes
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{review.summary}</h4>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {review.summary}
              </p>
              <Link 
                href={`/reviews/${review.id}`} 
                className="mt-3 inline-block text-blue-600 dark:text-blue-400 hover:underline"
              >
                Read Full Review
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;