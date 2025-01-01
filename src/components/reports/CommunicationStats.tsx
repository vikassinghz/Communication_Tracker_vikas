import { useMemo } from 'react';
import { BarChart, Activity } from 'lucide-react';
import { useCompaniesStore } from '../../store/companies';
import { COMMUNICATION_TYPES } from '../../store/communications';

export default function CommunicationStats() {
  const { companies } = useCompaniesStore();

  const stats = useMemo(() => {
    const typeCounts = COMMUNICATION_TYPES.reduce((acc, type) => ({
      ...acc,
      [type.value]: 0
    }), {} as Record<string, number>);

    companies.forEach(company => {
      if (company.lastCommunication) {
        typeCounts[company.lastCommunication.type]++;
      }
    });

    return typeCounts;
  }, [companies]);

  const maxCount = Math.max(...Object.values(stats));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold">Communication Methods Overview</h2>
      </div>

      <div className="space-y-4">
        {COMMUNICATION_TYPES.map(type => {
          const count = stats[type.value] || 0;
          const percentage = maxCount ? (count / maxCount) * 100 : 0;

          return (
            <div key={type.value}>
              <div className="flex justify-between text-sm mb-1">
                <span>{type.label}</span>
                <span className="text-gray-500">{count}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}