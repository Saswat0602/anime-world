'use client';

import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from 'next-themes';

interface StatsSectionProps {
  stats: {
    scoreDistribution: Array<{ score: number; amount: number }>;
    statusDistribution: Array<{ status: string; amount: number }>;
  };
}

const STATUS_COLORS: Record<string, string> = {
  CURRENT: 'bg-lime-500 text-white',
  PLANNING: 'bg-blue-500 text-white',
  PAUSED: 'bg-purple-500 text-white',
  DROPPED: 'bg-pink-400 text-white',
  COMPLETED: 'bg-rose-400 text-white',
  REPEATING: 'bg-cyan-500 text-white',
};
const STATUS_BAR_COLORS: Record<string, string> = {
  CURRENT: 'bg-lime-500',
  PLANNING: 'bg-blue-500',
  PAUSED: 'bg-purple-500',
  DROPPED: 'bg-pink-400',
  COMPLETED: 'bg-rose-400',
  REPEATING: 'bg-cyan-500',
};
const STATUS_LABELS: Record<string, string> = {
  CURRENT: 'Current',
  PLANNING: 'Planning',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
  PAUSED: 'Paused',
  REPEATING: 'Repeating',
};

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showAlt, setShowAlt] = useState(false);

  if (!stats || (!stats.scoreDistribution?.length && !stats.statusDistribution?.length)) {
    return null;
  }

  // --- Status Bar Data ---
  const totalStatus = stats.statusDistribution.reduce((sum, s) => sum + s.amount, 0);
  const statusOrder = ['CURRENT', 'PLANNING', 'PAUSED', 'DROPPED', 'COMPLETED', 'REPEATING'];
  const statusDataSorted = statusOrder
    .map(key => stats.statusDistribution.find(s => s.status === key))
    .filter(Boolean) as { status: string; amount: number }[];

  // --- Nivo Data ---
  const sortedScoreData = [...stats.scoreDistribution].sort((a, b) => a.score - b.score);
  const scoreChartData = sortedScoreData.map(item => ({
    score: item.score.toString(),
    users: item.amount
  }));
  const statusData = stats.statusDistribution.map(item => ({
    id: STATUS_LABELS[item.status] || item.status,
    label: STATUS_LABELS[item.status] || item.status,
    value: item.amount
  }));
  const COLORS = ['#84cc16', '#3b82f6', '#a78bfa', '#f472b6', '#fb7185', '#22d3ee'];
  const commonTheme = {
    text: {
      fill: isDark ? '#E5E7EB' : '#374151',
      fontSize: 12,
    },
    grid: {
      line: {
        stroke: isDark ? '#374151' : '#E5E7EB',
      },
    },
    axis: {
      ticks: {
        text: {
          fill: isDark ? '#9CA3AF' : '#6B7280',
        },
      },
    },
  };

  return (
    <section id="stats" className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h2>
        <button
          className="px-4 py-2 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          onClick={() => setShowAlt(v => !v)}
        >
          {showAlt ? 'Show Status Bar' : 'Show Alternative View'}
        </button>
      </div>

      {!showAlt ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Status Distribution</h3>

          {/* Status Distribution Tags */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {statusDataSorted.map((item) => (
              <div key={item.status} className="flex flex-col items-center">
                <span className={`w-full text-center px-3 py-1.5 rounded-lg text-sm font-semibold mb-2 ${STATUS_COLORS[item.status]}`}>
                  {STATUS_LABELS[item.status]}
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.amount.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Users</span>
              </div>
            ))}
          </div>

          {/* Status Bar */}
          <div className="mt-6">
            <div className="w-full h-6 rounded-lg overflow-hidden flex">
              {statusDataSorted.map((item) => (
                <div
                  key={item.status}
                  className={`${STATUS_BAR_COLORS[item.status]} h-full relative group transition-all duration-200 hover:brightness-110`}
                  style={{ width: `${(item.amount / totalStatus) * 100}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity duration-200">
                    {STATUS_LABELS[item.status]}: {item.amount.toLocaleString()} users
                  </div>
                </div>
              ))}
            </div>

            {/* Legend for small screens */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center md:hidden">
              {statusDataSorted.map((item) => (
                <div key={item.status} className="flex items-center">
                  <div className={`h-3 w-3 rounded-full ${STATUS_BAR_COLORS[item.status]}`}></div>
                  <span className="ml-1 text-xs text-gray-700 dark:text-gray-300">{STATUS_LABELS[item.status]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Score Distribution */}
          {scoreChartData.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Score Distribution</h3>
              <div className="h-[350px] w-full">
                <ResponsiveBar
                  data={scoreChartData}
                  keys={['users']}
                  indexBy="score"
                  margin={{ top: 30, right: 30, bottom: 60, left: 70 }}
                  padding={0.3}
                  colors={['#3b82f6']}
                  colorBy="indexValue"
                  borderRadius={4}
                  borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Score',
                    legendPosition: 'middle',
                    legendOffset: 40,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Users',
                    legendPosition: 'middle',
                    legendOffset: -50,
                    format: value => Number(value).toLocaleString(),
                  }}
                  enableLabel={false}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  animate={true}
                  theme={commonTheme}
                  tooltip={({ id, value, color }) => (
                    <div className="bg-white dark:bg-gray-800 text-sm py-2 px-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="font-medium text-gray-900 dark:text-white">Score: {id}</div>
                      <div className="flex items-center">
                        <span className="inline-block w-3 h-3 mr-1 rounded-full" style={{ backgroundColor: color }}></span>
                        <span className="text-gray-900 dark:text-gray-100">{value.toLocaleString()} users</span>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          )}

          {/* Watch Status */}
          {statusData.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Watch Status</h3>
              <div className="h-[300px] w-full">
                <ResponsivePie
                  data={statusData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  innerRadius={0.6}
                  padAngle={0.7}
                  cornerRadius={4}
                  activeOuterRadiusOffset={8}
                  colors={COLORS}
                  borderWidth={0}
                  enableArcLinkLabels={true}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: 'color' }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={isDark ? '#E5E7EB' : '#374151'}
                  theme={commonTheme}
                  tooltip={({ datum }) => (
                    <div className="bg-white dark:bg-gray-800 text-sm p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="font-medium text-gray-900 dark:text-white">{datum.label}</div>
                      <div className="text-blue-600 dark:text-blue-400">{datum.value.toLocaleString()} users</div>
                    </div>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default StatsSection;
