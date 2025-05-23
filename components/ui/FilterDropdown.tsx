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
        multiSelect = false
    }) => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 768);
            };
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return () => window.removeEventListener('resize', checkMobile);
        }, []);

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
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none flex justify-between items-center text-gray-700 dark:text-gray-300"
                    role="option"
                    aria-selected={isOptionSelected(option)}
                >
                    <span>{option}</span>
                    {isOptionSelected(option) && (
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                </button>
            ));
        }, [options, isOptionSelected, toggleOption]);

        const buttonClasses =
            "flex items-center justify-between w-full px-4 py-2 text-sm bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none text-gray-700 dark:text-gray-300";

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
                    <span className="truncate">{displayValue}</span>
                    {remainderCount > 0 && (
                        <div className="ml-1 text-xs bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1 rounded-sm flex items-center justify-center">
                            +{remainderCount}
                        </div>
                    )}
                    <ChevronDown
                        className={`w-4 h-4 ml-2 transition-transform text-gray-700 dark:text-gray-300 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="dropdown"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            className="fixed md:absolute z-[100] w-[calc(100vw-2rem)] md:w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-[300px] overflow-y-auto left-4 md:left-0"
                            role="listbox"
                        >
                            <div className="py-1">{optionsList}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

FilterDropdown.displayName = "FilterDropdown";

export default FilterDropdown;
