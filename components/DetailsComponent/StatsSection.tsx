'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface StatsSectionProps {
  stats: {
    scoreDistribution: Array<{ score: number; amount: number }>;
    statusDistribution: Array<{ status: string; amount: number }>;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  if (!stats || (!stats.scoreDistribution && !stats.statusDistribution)) {
    return null;
  }
  
  // Sort score distribution in ascending order
  const sortedScoreData = [...(stats.scoreDistribution || [])]
    .sort((a, b) => a.score - b.score);
  
  // Status mapping for labels
  const statusLabels: Record<string, string> = {
    CURRENT: 'Watching',
    PLANNING: 'Plan to Watch',
    COMPLETED: 'Completed',
    DROPPED: 'Dropped',
    PAUSED: 'Paused',
    REPEATING: 'Rewatching'
  };
  
  // Format status distribution data for pie chart
  const statusData = (stats.statusDistribution || []).map(item => ({
    name: statusLabels[item.status] || item.status,
    value: item.amount
  }));
  
  // Colors for pie chart
  const COLORS = ['#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c'];
  
  // Custom tooltip for bar chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
          <p className="font-medium">{`Score: ${payload[0].payload.score}`}</p>
          <p className="text-blue-400">{`Users: ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="stats" className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Stats</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Score Distribution */}
        {stats.scoreDistribution && stats.scoreDistribution.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-medium mb-4 text-center">Score Distribution</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedScoreData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
                >
                  <XAxis dataKey="score" stroke="#cccccc" />
                  <YAxis stroke="#cccccc" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="amount" 
                    fill="#3498db" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {/* Status Distribution */}
        {stats.statusDistribution && stats.statusDistribution.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-xl font-medium mb-4 text-center">Watch Status</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    animationDuration={1500}
                  >
                    {statusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [value.toLocaleString(), 'Users']}
                    labelFormatter={(name) => `Status: ${name}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;