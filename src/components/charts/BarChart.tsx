// =====================================================
// BarChart Component
// =====================================================
// Renders a horizontal bar chart for displaying data distributions.
// Uses Tailwind CSS for styling.
// =====================================================

import { useState } from 'react';

interface BarChartProps {
  data: Record<string, number>;
  title: string;
  color?: string;
}

export function BarChart({ data, title, color = 'gradient-primary' }: BarChartProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  const [hovered, setHovered] = useState<string>('');

  return (
    <div className="p-4 glass rounded-lg">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="space-y-2">
        {Object.entries(data)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([label, value]) => {
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return (
              <div
                key={label}
                className="group relative"
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered('')}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {formatLabel(label)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {value} ({total > 0 ? ((value / total) * 100).toFixed(1) : '0'}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${color}`}
                    style={{ width: percentage }}
                  />
                </div>
                {hovered === label && (
                  <div className="absolute top-0 left-0 text-xs text-muted-foreground bg-card px-2 py-1 rounded shadow-sm">
                    {formatLabel(label)}: {value}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

function formatLabel(label: string): string {
  return label
    .replace(/_/g, ' ')
    .split(/[\s_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
