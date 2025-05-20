'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CharactersSectionProps {
  characters: any[];
}

const CharactersSection: React.FC<CharactersSectionProps> = ({ characters }) => {
  if (!characters || characters.length === 0) {
    return null;
  }

  return (
    <section id="characters" className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Characters</h2>
        <Link href="#" className="text-blue-400 hover:underline">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {characters.slice(0, 8).map((edge) => (
          <div 
            key={edge.node.id} 
            className="bg-gray-800 rounded-lg overflow-hidden flex"
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
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">
                    {edge.node.name.full}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {edge.role.charAt(0) + edge.role.slice(1).toLowerCase()} Role
                  </p>
                </div>
                
                {edge.voiceActors && edge.voiceActors.length > 0 && (
                  <div className="text-right">
                    <h4 className="font-medium">
                      {edge.voiceActors[0].name.full}
                    </h4>
                    <p className="text-sm text-gray-400">Japanese</p>
                  </div>
                )}
              </div>
            </div>
            
            {edge.voiceActors && edge.voiceActors.length > 0 && (
              <div className="w-16 h-20 flex-shrink-0">
                <Image
                  src={edge.voiceActors[0].image.large}
                  alt={edge.voiceActors[0].name.full}
                  width={64}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CharactersSection;