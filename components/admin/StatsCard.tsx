interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: string;
}

export default function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-apty-coral-accent shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-apty-gray text-sm font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-apty-dark">{value}</p>
        {change && (
          <span className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

