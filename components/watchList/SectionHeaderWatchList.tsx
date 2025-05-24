import { LucideIcon } from 'lucide-react';

interface SectionHeaderWatchListProps {
  title: string;
  count: number;
  icon: LucideIcon;
}

const SectionHeaderWatchList = ({ title, count, icon: Icon }: SectionHeaderWatchListProps) => (
  <div className="flex items-center gap-3 mb-6">
    <Icon className="text-blue-500" size={24} />
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
    <span className="bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
      {count}
    </span>
  </div>
);

export default SectionHeaderWatchList;