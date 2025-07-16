import React from 'react';

interface ChartProps {
  title: string;
  data: Array<{ name: string; value: number; color?: string }>;
  type: 'bar' | 'line' | 'pie';
}

const Chart: React.FC<ChartProps> = ({ title, data, type }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-24 text-sm text-gray-600 font-medium">{item.name}</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-500 ${item.color || 'bg-blue-600'}`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-sm font-semibold text-gray-900 text-right">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-56 h-56">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage} ${100 - percentage}`;
                const strokeDashoffset = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 100, 0);
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={item.color || `hsl(${index * 60}, 70%, 50%)`}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={-strokeDashoffset}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 50%)` }}
                />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Line chart (simplified)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`w-full ${item.color || 'bg-blue-600'} rounded-t transition-all duration-500`}
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
            <div className="text-xs text-gray-600 mt-3 text-center font-medium">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;