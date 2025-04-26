import Image from 'next/image';

interface Review {
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-800">
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-full overflow-hidden relative flex-shrink-0">
        <Image
          src={'/user.jpg'}
          alt={review.user}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-slate-900 dark:text-white">{review.user}</h4>
          <div className="flex items-center bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 px-2 py-1 rounded-full text-xs font-bold">
            {review.rating}
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{review.text}</p>
        <p className="text-slate-400 dark:text-slate-500 text-xs">{review.date}</p>
      </div>
    </div>
  </div>
);

export default ReviewCard;