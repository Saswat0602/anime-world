import { FilterDropdownProps } from '@/types/filterTypes';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const FilterDropdown = ({ label, options, value, onChange, multiSelect = false }: FilterDropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const displayValue = useMemo(() => {
        if (multiSelect && Array.isArray(value) && value.length > 0) {
            return `${value.length} selected`;
        }
        return typeof value === 'string' ? value : 'Any';
    }, [value, multiSelect]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        const target = event.target as Node;
        if (isOpen && !document.getElementById(`${label.toLowerCase()}-dropdown`)?.contains(target)) {
            setIsOpen(false);
        }
    }, [isOpen, label]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    const toggleOption = useCallback((option: string) => {
        if (!multiSelect) {
            onChange(option);
            setIsOpen(false);
            return;
        }

        if (!Array.isArray(value)) {
            onChange([option]);
            return;
        }

        const updatedValues = value.includes(option)
            ? value.filter(item => item !== option)
            : [...value, option];
        
        onChange(updatedValues.length ? updatedValues : ['Any']);
    }, [multiSelect, onChange, value]);

    const removeOption = useCallback((option: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!multiSelect || !Array.isArray(value)) return;
        
        const updatedValues = value.filter(item => item !== option);
        onChange(updatedValues.length ? updatedValues : ['Any']);
    }, [multiSelect, onChange, value]);

    const clearAll = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(['Any']);
    }, [onChange]);

    const isOptionSelected = useCallback((option: string) => {
        if (multiSelect && Array.isArray(value)) {
            return value.includes(option);
        }
        return value === option;
    }, [multiSelect, value]);

    return (
        <div id={`${label.toLowerCase()}-dropdown`} className="relative z-20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 focus:outline-none"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {!multiSelect || !Array.isArray(value) || value.length === 0 || value[0] === 'Any' ? (
                    <span className="truncate">{displayValue}</span>
                ) : (
                    <div className="flex flex-wrap gap-1">
                        {multiSelect && Array.isArray(value) && value[0] !== 'Any' && (
                            <>
                                {value.map(item => (
                                    <div key={item} className="flex items-center bg-blue-600 text-white px-2 py-0.5 rounded text-xs">
                                        {item}
                                        <button 
                                            onClick={(e) => removeOption(item, e)}
                                            className="ml-1 text-white hover:text-gray-200"
                                            aria-label={`Remove ${item}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                {value.length > 0 && (
                                    <button 
                                        onClick={clearAll}
                                        className="text-xs text-gray-400 hover:text-white ml-1"
                                        aria-label="Clear all"
                                    >
                                        Clear
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}
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
                                onClick={() => toggleOption(option)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 focus:outline-none flex justify-between items-center ${
                                    isOptionSelected(option) ? 'bg-blue-600 text-white' : 'text-gray-300'
                                }`}
                                role="option"
                                aria-selected={isOptionSelected(option)}
                            >
                                <span>{option}</span>
                                {isOptionSelected(option) && (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown
