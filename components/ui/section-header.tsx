import Link from "next/link";
import React from "react";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  viewAllLink?: string;
}

export function SectionHeader({ title, icon, viewAllLink }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="section-title">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      {viewAllLink && (
        <Link href={viewAllLink} className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline">
          View All
        </Link>
      )}
    </div>
  );
} 