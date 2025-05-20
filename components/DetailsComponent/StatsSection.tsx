'use client';

import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from 'next-themes';

interface StatsSectionProps {
  stats: {
    scoreDistribution: Array<{ score: number; amount: number }>;
    statusDistribution: Array<{ status: string; amount: number }>;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!stats || (!stats.scoreDistribution?.length && !stats.statusDistribution?.length)) {
    return null;
  }

  const sortedScoreData = [...stats.scoreDistribution].sort((a, b) => a.score - b.score);

  const scoreChartData = sortedScoreData.map(item => ({
    score: item.score.toString(),
    users: item.amount
  }));

  const statusLabels: Record<string, string> = {
    CURRENT: 'Watching',
    PLANNING: 'Plan to Watch',
    COMPLETED: 'Completed',
    DROPPED: 'Dropped',
    PAUSED: 'Paused',
    REPEATING: 'Rewatching'
  };

  const statusData = stats.statusDistribution.map(item => ({
    id: statusLabels[item.status] || item.status,
    label: statusLabels[item.status] || item.status,
    value: item.amount
  }));

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#F59E0B', '#06B6D4'];

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
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Statistics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Distribution */}
        {scoreChartData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Score Distribution</h3>
            <div className="h-[300px] w-full">
              <ResponsiveBar
                data={scoreChartData}
                keys={['users']}
                indexBy="score"
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                padding={0.3}
                colors={['#3B82F6']}
                borderRadius={4}
                borderWidth={0}
                enableGridY={true}
                enableGridX={false}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Score',
                  legendPosition: 'middle',
                  legendOffset: 40,
                  ...commonTheme.axis,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Users',
                  legendPosition: 'middle',
                  legendOffset: -50,
                  ...commonTheme.axis,
                }}
                theme={commonTheme}
                tooltip={({ id, value }) => (
                  <div className="bg-white dark:bg-gray-800 text-sm p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="font-medium text-gray-900 dark:text-white">Score {id}</div>
                    <div className="text-blue-600 dark:text-blue-400">{value.toLocaleString()} users</div>
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
    </section>
  );
};

export default StatsSection;
