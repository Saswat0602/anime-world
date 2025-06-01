import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterDropdownProps } from "@/types/filterTypes";

const FilterDropdown: React.FC<FilterDropdownProps> = React.memo(
    ({
        label,
        options,
        value,
        onChange,
        multiSelect = false,
        className = ""
    }) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);

        const displayValue = useMemo(() => {
            if (!multiSelect || !Array.isArray(value) || value.length === 0) {
                return typeof value === "string" ? value : label;
            }
            if (value.includes("Any")) return "Any";
            return value.length > 1 ? `${value[0]}` : value[0];
        }, [value, multiSelect, label]);

        const remainderCount = useMemo(() => {
            if (
                multiSelect &&
                Array.isArray(value) &&
                value.length > 1 &&
                !value.includes("Any")
            ) {
                return value.length - 1;
            }
            return 0;
        }, [multiSelect, value]);

        const toggleDropdown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
        }, []);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent | TouchEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside as EventListener);
                document.addEventListener('touchstart', handleClickOutside as EventListener);
            }

            return () => {
                document.removeEventListener('mousedown', handleClickOutside as EventListener);
                document.removeEventListener('touchstart', handleClickOutside as EventListener);
            };
        }, [isOpen]);

        const isOptionSelected = useCallback(
            (option: string) => {
                if (multiSelect && Array.isArray(value)) {
                    return value.includes(option);
                }
                return value === option;
            },
            [multiSelect, value]
        );

        const toggleOption = useCallback(
            (option: string) => {
                if (!multiSelect) {
                    onChange(option);
                    setIsOpen(false);
                    return;
                }

                if (!Array.isArray(value)) {
                    onChange([option]);
                    return;
                }

                let updatedValues: string[];

                if (option === "Any") {
                    updatedValues = ["Any"];
                } else {
                    const isAlreadySelected = value.includes(option);
                    if (isAlreadySelected) {
                        updatedValues = value.filter(
                            (v) => v !== option && v !== "Any"
                        );
                    } else {
                        updatedValues = value
                            .filter((v) => v !== "Any")
                            .concat(option);
                    }

                    if (updatedValues.length === 0) {
                        updatedValues = ["Any"];
                    }
                }

                onChange(updatedValues);
            },
            [multiSelect, onChange, value]
        );

        const optionsList = useMemo(() => {
            return options.map((option) => (
                <button
                    key={option}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleOption(option);
                    }}
                    className="group w-full text-left px-4 py-2.5 text-sm 
                    hover:bg-blue-50 dark:hover:bg-blue-900/20 
                    focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900/20
                    flex justify-between items-center text-slate-700 dark:text-slate-300
                    transition-colors duration-150"
                    role="option"
                    aria-selected={isOptionSelected(option)}
                >
                    <span className="font-medium">{option}</span>
                    {isOptionSelected(option) && (
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-100 scale-100 transition-all duration-200" />
                    )}
                </button>
            ));
        }, [options, isOptionSelected, toggleOption]);

        const buttonClasses = `group flex items-center justify-between w-full px-4 py-2.5 text-sm 
        bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg 
        hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
        text-slate-700 dark:text-slate-300 transition-all duration-200 ${className}`;

        return (
            <div
                ref={dropdownRef}
                className="relative"
            >
                <button
                    onClick={toggleDropdown}
                    onTouchEnd={toggleDropdown}
                    className={buttonClasses}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span className="truncate font-medium">{displayValue}</span>
                    <div className="flex items-center ml-2 gap-1">
                        {remainderCount > 0 && (
                            <div className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">
                                +{remainderCount}
                            </div>
                        )}
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="dropdown"
                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                            transition={{ 
                                duration: 0.2, 
                                ease: [0.16, 1, 0.3, 1] // Custom easing for smooth animation
                            }}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            className="fixed md:absolute z-[100] w-[calc(100vw-2rem)] md:w-full mt-2 
                            bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 
                            rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 
                            max-h-[280px] overflow-y-auto left-4 md:left-0 backdrop-blur-sm"
                            role="listbox"
                        >
                            <div className="py-2">
                                {optionsList}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

FilterDropdown.displayName = "FilterDropdown";

export default FilterDropdown;