import React, { useState, useEffect, useRef, memo } from 'react';
import { HiOutlineClipboardCopy } from "react-icons/hi";

interface JsonTreeProps {
  data: unknown;
  initialExpandPaths?: string[];
}

// Memoized line component to prevent unnecessary renders
const LineNumber = memo(({ num }: { num: number }) => {
  return <div className="leading-tight">{num}</div>;
});
LineNumber.displayName = 'LineNumber';

// JSON Tree component for better JSON visualization with line numbering and copy feature
export const JSONTree = memo(({ data, initialExpandPaths = ['root', 'root.data', 'root.pagination'] }: JsonTreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(initialExpandPaths));
  const lineCountRef = useRef<number>(1);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Update line numbers when expanded keys change or data changes
  useEffect(() => {
    // Reset line counter
    lineCountRef.current = 1;
    const calculateTotalLines = (obj: unknown, path: string = 'root'): number => {
      if (!expandedKeys.has(path)) return 1;
      
      if (obj === null || typeof obj !== 'object') return 1;
      
      let lines = 1;
      
      if (Array.isArray(obj) || (obj && Object.keys(obj).length > 0)) {
        if (expandedKeys.has(path)) {
          Object.entries(obj).forEach(([key, value]) => {
            lines += calculateTotalLines(value, `${path}.${key}`);
          });
          lines++;
        }
      }
      
      return lines;
    };
    
    const totalLines = calculateTotalLines(data);
    setLineNumbers(Array.from({ length: totalLines }, (_, i) => i + 1));
  }, [expandedKeys, data]);

  const toggleNode = (path: string): void => {
    setExpandedKeys(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(path)) {
        newExpanded.delete(path);
      } else {
        newExpanded.add(path);
      }
      return newExpanded;
    });
  };

  const copyToClipboard = (value: unknown, path: string): void => {
    const stringValue = typeof value === 'object' && value !== null
      ? JSON.stringify(value, null, 2)
      : String(value);
    
    navigator.clipboard.writeText(stringValue);
    setCopiedField(path);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const renderValue = (value: unknown, path: string): React.ReactElement => {
    if (value === null) return (
      <div className="inline-flex items-center">
        <span className="text-gray-400">null</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    if (typeof value === 'boolean') return (
      <div className="inline-flex items-center">
        <span className="text-orange-400">{value.toString()}</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    if (typeof value === 'number') return (
      <div className="inline-flex items-center">
        <span className="text-blue-400">{value}</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    if (typeof value === 'string') return (
      <div className="inline-flex items-center">
        <span className="text-green-400">&quot;{value}&quot;</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    if (typeof value !== 'object') return (
      <div className="inline-flex items-center">
        <span className="text-gray-400">{String(value)}</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    const isArray = Array.isArray(value);
    const prefix = isArray ? '[' : '{';
    const suffix = isArray ? ']' : '}';
    const isExpanded = expandedKeys.has(path);
    const isEmpty = value === null || Object.keys(value).length === 0;
    
    if (isEmpty) {
      return (
        <div className="inline-flex items-center">
          <span>{isArray ? "[]" : "{}"}</span>
          <button 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              copyToClipboard(value, path);
            }}
            className="ml-2 opacity-50 hover:opacity-100"
            title="Copy object"
          >
            <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
          </button>
        </div>
      );
    }

    return (
      <div className="ml-1">
        <div className="inline-flex items-center">
          <span 
            className="cursor-pointer hover:text-blue-500"
            onClick={() => toggleNode(path)}
          >
            {prefix}
            <span className="ml-1 text-gray-400">
              {isExpanded ? "" : isArray ? `Array(${Object.keys(value).length})` : `${Object.keys(value).length} keys`}
            </span>
            {isExpanded ? "" : suffix}
          </span>
          <button 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              copyToClipboard(value, path);
            }}
            className="ml-2 opacity-50 hover:opacity-100"
            title="Copy object"
          >
            <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
          </button>
        </div>
        
        {isExpanded && (
          <div className="ml-4 border-l-2 border-gray-700 pl-2">
            {Object.entries(value as Record<string, unknown>).map(([k, v], i, arr) => (
              <div key={k} className="whitespace-nowrap">
                <span className="text-purple-400">{isArray ? "" : `"${k}": `}</span>
                {renderValue(v, `${path}.${k}`)}
                {i < arr.length - 1 ? "," : ""}
              </div>
            ))}
            <span>{suffix}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-mono text-sm flex">
      <div className="mr-2 text-right text-gray-500 select-none border-r pr-2 min-w-[30px]">
        {lineNumbers.map((num) => (
          <LineNumber key={num} num={num} />
        ))}
      </div>
      <div className="w-full">
        {renderValue(data, 'root')}
      </div>
    </div>
  );
});
JSONTree.displayName = 'JSONTree'; 