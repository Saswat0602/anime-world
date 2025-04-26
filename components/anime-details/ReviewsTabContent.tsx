'use client';

import { motion } from 'framer-motion';
import ReviewCard from './ReviewCard';


type ReviewsTabContentProps = Record<string, never>;

// Mock reviews for demo
interface Review {
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    user: "AnimeEnthusiast42",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 9.2,
    text: "One of the best anime I've ever watched. The characters are well developed and the story is captivating from start to finish.",
    date: "2023-08-15"
  },
  {
    user: "OtakuMaster",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 8.5,
    text: "Great animation quality and soundtrack. The pacing could be better in some episodes, but overall it's an excellent show.",
    date: "2023-07-22"
  },
  {
    user: "SakuraChan",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 9.8,
    text: "Absolutely love this! The plot twists are incredible and the character development is some of the best I've seen.",
    date: "2023-06-10"
  }
];

const ReviewsTabContent = ({}: ReviewsTabContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        {mockReviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ReviewsTabContent;