import { FilterDropdownProps } from '@/types/filterTypes';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const FilterDropdown: React.FC<FilterDropdownProps> = React.memo(({
    label,
    options,
    value,
    onChange,
    multiSelect = false
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const displayValue = useMemo(() => {
        if (!multiSelect || !Array.isArray(value) || value.length === 0) {
            return typeof value === 'string' ? value : label;
        }
        if (value[0] === 'Any') {
            return 'Any';
        }

        if (value.length > 1) {
            return `${value[0]}`;
        }

        return value[0];
    }, [value, multiSelect, label]);

    const remainderCount = useMemo(() => {
        if (multiSelect && Array.isArray(value) && value.length > 1 && value[0] !== 'Any') {
            return value.length - 1;
        }
        return 0;
    }, [multiSelect, value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const isOptionSelected = useCallback((option: string) => {
        if (multiSelect && Array.isArray(value)) {
            return value.includes(option) && option !== 'Any';
        }
        return value === option;
    }, [multiSelect, value]);

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

        let updatedValues;

        if (value.includes(option)) {
            updatedValues = value.filter(item => item !== option);
            if (updatedValues.length === 0 || (updatedValues.length === 1 && updatedValues[0] === 'Any')) {
                onChange(['Any']);
                return;
            }
        } else {
            if (value.includes('Any') && value.length === 1) {
                updatedValues = [option];
            } else {
                updatedValues = [...value, option];
            }
        }

        onChange(updatedValues);
    }, [multiSelect, onChange, value]);

    const optionsList = useMemo(() => {
        return options
            .filter(option => option !== 'Any')
            .map((option) => (
                <button
                    key={option}
                    onClick={() => toggleOption(option)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 focus:outline-none flex justify-between items-center text-gray-300"
                    role="option"
                    aria-selected={isOptionSelected(option)}
                >
                    <span>{option}</span>
                    {isOptionSelected(option) && (
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            ));
    }, [options, isOptionSelected, toggleOption]);

    const buttonClasses = "flex items-center justify-between w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 focus:outline-none";

    return (
        <div ref={dropdownRef} className="relative z-20">
            <button
                onClick={toggleDropdown}
                className={buttonClasses}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="truncate">{displayValue}</span>
                {remainderCount > 0 && (
                    <div className="ml-1 text-xs bg-gray-700 px-1 rounded-sm flex items-center justify-center">
                        +{remainderCount}
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
                        {optionsList}
                    </div>
                </div>
            )}
        </div>
    );
});

FilterDropdown.displayName = 'FilterDropdown';

export default FilterDropdown;