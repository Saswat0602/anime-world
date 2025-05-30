'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, ChevronRight, Award, User } from 'lucide-react';
import { StaffEdge } from '@/types/animeDetails';

interface StaffSectionProps {
  staff: StaffEdge[];
}

const StaffSection: React.FC<StaffSectionProps> = ({ staff }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (!staff || staff.length === 0) {
    return null;
  }

  const getRoleIcon = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (lowerRole.includes('director')) return <Award size={14} className="text-yellow-500" />;
    if (lowerRole.includes('producer')) return <Briefcase size={14} className="text-blue-500" />;
    if (lowerRole.includes('writer') || lowerRole.includes('script')) return <User size={14} className="text-green-500" />;
    return <User size={14} className="text-gray-500" />;
  };

  const getRoleColor = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (lowerRole.includes('director')) return 'from-yellow-400 to-orange-500';
    if (lowerRole.includes('producer')) return 'from-blue-400 to-indigo-500';
    if (lowerRole.includes('writer') || lowerRole.includes('script')) return 'from-green-400 to-emerald-500';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <section id="staff" className="mb-16">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl overflow-hidden">
        <div className="relative p-6 pb-4 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/20 to-blue-500/20 rounded-full blur-2xl"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
                <Briefcase size={24} className="text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Staff
              </h2>
            </div>

            <Link
              href="#"
              className="group flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/50 hover:bg-green-500 dark:hover:bg-green-600 transition-all duration-300 hover:scale-105"
            >
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-white font-medium">View All</span>
              <ChevronRight size={16} className="text-gray-700 dark:text-gray-300 group-hover:text-white" />
            </Link>
          </div>
        </div>

        {/* Staff Grid */}
        <div className="p-6 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {staff.slice(0, 8).map((edge, index) => (
              <div
                key={edge.node.id}
                className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/80 dark:hover:bg-gray-800/80"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-col">
                  {/* Staff Image */}
                  <div className="relative w-full h-32">
                    <Image
                      src={edge.node.image.large}
                      alt={edge.node.name.full}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Role Badge */}
                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-to-r ${getRoleColor(edge.role)} shadow-lg flex items-center space-x-1`}>
                      {getRoleIcon(edge.role)}
                    </div>

                    {/* Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="font-bold text-white text-sm leading-tight group-hover:text-blue-200 transition-colors duration-200">
                        {edge.node.name.full}
                      </h4>
                    </div>
                  </div>

                  {/* Staff Info */}
                  <div className="p-4">
                    <div className="flex items-start space-x-2">
                      <div className="flex-grow">
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-tight">
                          {edge.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-purple-500/20 opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : ''}`}></div>

                {/* Hover Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-blue-400/50 opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffSection;