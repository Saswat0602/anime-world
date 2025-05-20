'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StaffEdge } from '@/types/animeDetails';

interface StaffSectionProps {
  staff: StaffEdge[];
}

const StaffSection: React.FC<StaffSectionProps> = ({ staff }) => {
  if (!staff || staff.length === 0) {
    return null;
  }

  return (
    <section id="staff" className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Staff</h2>
        <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {staff.slice(0, 8).map((edge) => (
          <div 
            key={edge.node.id} 
            className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex"
          >
            <div className="w-16 h-20 flex-shrink-0">
              <Image
                src={edge.node.image.large}
                alt={edge.node.name.full}
                width={64}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-3 flex-grow">
              <h4 className="font-medium truncate text-gray-900 dark:text-white">
                {edge.node.name.full}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {edge.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffSection;