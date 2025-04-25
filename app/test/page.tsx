import React from 'react';
import { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#1f2937'
};

const TestPage = () => {
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <div className="col-span-2 bg-blue-500 w-[100px] h-[100px] rounded-lg shadow-md flex items-center justify-center text-white font-bold">
        Box 1
      </div>
      <div className="col-span-2 bg-green-500 w-[100px] h-[100px] rounded-lg shadow-md flex items-center justify-center text-white font-bold">
        Box 2
      </div>
      <div className="col-span-2 bg-red-500 w-[100px] h-[100px] rounded-lg shadow-md flex items-center justify-center text-white font-bold">
        Box 3
      </div>

      <div className="col-span-2 bg-yellow-500 w-[100px] h-[100px] rounded-lg shadow-md flex items-center justify-center text-black font-bold">
        Box 4
      </div>
      <div className="col-span-2 bg-purple-500 w-[100px] h-[100px] rounded-lg shadow-md flex items-center justify-center text-white font-bold">
        Box 5
      </div>
      <div className="col-span-2 bg-pink-500 w-[100px] h-[100px] rounded-lg shadow-md flex items-center justify-center text-white font-bold">
        Box 6
      </div>
    </div>
  )
}

export default TestPage
