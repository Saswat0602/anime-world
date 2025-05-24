import Link from "next/link";
import React from "react";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  viewAllLink?: string;
  count?: number;
}

export function SectionHeader({ title, icon, viewAllLink, count }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="section-title">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
        {count !== undefined && (
          <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            ({count})
          </span>
        )}
      </h2>
      {viewAllLink && (
        <Link href={viewAllLink} className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline">
          View All
        </Link>
      )}
    </div>
  );
} 