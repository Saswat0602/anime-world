'use client';

import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

interface StatsSectionProps {
  stats: {
    scoreDistribution: Array<{ score: number; amount: number }>;
    statusDistribution: Array<{ status: string; amount: number }>;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
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

  const COLORS = ['#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'];

  return (
    <section id="stats" className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Stats</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Distribution */}
        {scoreChartData.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-medium mb-4 text-center">Score Distribution</h3>
            <div className="h-64 w-full">
              <ResponsiveBar
                data={scoreChartData}
                keys={['users']}
                indexBy="score"
                margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Score',
                  legendPosition: 'middle',
                  legendOffset: 32
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Users',
                  legendPosition: 'middle',
                  legendOffset: -40
                }}
                tooltip={({ id, value }) => (
                  <div className="bg-gray-900 text-sm text-white p-2 rounded">
                    {id}: {value.toLocaleString()} users
                  </div>
                )}
              />
            </div>
          </div>
        )}

        {/* Watch Status */}
        {statusData.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-medium mb-4 text-center">Watch Status</h3>
            <div className="h-64 w-full">
              <ResponsivePie
                data={statusData}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={COLORS}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#ccc"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                tooltip={({ datum }) => (
                  <div className="bg-gray-900 text-sm text-white p-2 rounded">
                    {datum.label}: {datum.value.toLocaleString()} users
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
