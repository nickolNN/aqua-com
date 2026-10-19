interface PieChartProps {
  data: Record<string, number>;
  title: string;
  colorPalette?: string[];
}

const defaultColorPalette = [
  'bg-teal-500',
  'bg-cyan-500',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-teal-600',
  'bg-teal-700',
];

const colorMap: Record<string, string> = {
  'bg-teal-500': '#14b8a6',
  'bg-cyan-500': '#06b6d4',
  'bg-teal-400': '#2dd4bf',
  'bg-cyan-400': '#22d3ee',
  'bg-teal-600': '#0d9488',
  'bg-teal-700': '#0f766e',
};

export function PieChart({ data, title, colorPalette: customPalette }: PieChartProps) {
  const palette = customPalette || defaultColorPalette;
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  return (
    <div className="p-4 glass rounded-lg">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {(() => {
              const segments = Object.entries(data)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5);
              const angle = 0;
              return segments.map(([label, value], index) => {
                const percentage = total > 0 ? (value / total) * 100 : 0;
                const sweep = (percentage / 100) * 360;
                const color = palette[index % palette.length];
                const colorValue = colorMap[color] || '#3b82f6';

                const startRad = ((angle - 90) * Math.PI) / 180;
                const endRad = (((angle + sweep) - 90) * Math.PI) / 180;

                const cx = 50;
                const cy = 50;
                const r = 40;

                const x1 = cx + r * Math.cos(startRad);
                const y1 = cy + r * Math.sin(startRad);
                const x2 = cx + r * Math.cos(endRad);
                const y2 = cy + r * Math.sin(endRad);

                const largeArc = sweep > 180 ? 1 : 0;

                return (
                  <path
                    key={label}
                    d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
                    fill={colorValue}
                    stroke="white"
                    strokeWidth={2}
                  />
                );
              });
            })()}
          </svg>
          <div className="absolute inset-3 bg-card rounded-full" />
        </div>
        <div className="flex-1 space-y-1">
          {Object.entries(data)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([label, value], index) => {
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${palette[index % palette.length]}`} />
                  <span className="text-sm text-foreground capitalize">
                    {formatLabel(label)} ({value})
                  </span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    ({percentage}%)
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function formatLabel(label: string): string {
  return label
    .replace(/_/g, ' ')
    .split(/[\s_-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
