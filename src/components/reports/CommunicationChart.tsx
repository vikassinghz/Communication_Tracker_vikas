import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCompaniesStore } from '../../store/companies';
import { COMMUNICATION_TYPES } from '../../store/communications';

export default function CommunicationChart() {
  const { companies } = useCompaniesStore();
  
  const data = useMemo(() => {
    const counts = COMMUNICATION_TYPES.reduce((acc, type) => ({
      ...acc,
      [type.value]: 0
    }), {} as Record<string, number>);
    
    companies.forEach(company => {
      if (company.lastCommunication) {
        counts[company.lastCommunication.type]++;
      }
    });
    
    return COMMUNICATION_TYPES.map(type => ({
      name: type.label,
      count: counts[type.value],
      percentage: (counts[type.value] / companies.length) * 100
    }));
  }, [companies]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Communication Methods Usage</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Usage']}
            />
            <Bar
              dataKey="percentage"
              fill="#0284c7"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}