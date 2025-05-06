import { FilterDropdownProps } from '@/types/filterTypes';
import React, { useEffect, useState } from 'react'

const FilterDropdown = ({ label, options, value, onChange }: FilterDropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (isOpen && !document.getElementById(`${label.toLowerCase()}-dropdown`)?.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, label]);

    return (
        <div id={`${label.toLowerCase()}-dropdown`} className="relative z-20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 focus:outline-none"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="truncate">{value}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-[500px] overflow-y-auto"
                    role="listbox"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 focus:outline-none ${value === option ? 'bg-blue-600 text-white' : 'text-gray-300'
                                    }`}
                                role="option"
                                aria-selected={value === option}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown
