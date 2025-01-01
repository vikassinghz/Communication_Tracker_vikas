import { format } from 'date-fns';
import { History } from 'lucide-react';
import { useCompaniesStore } from '../../store/companies';
import { COMMUNICATION_TYPES } from '../../store/communications';

export default function ActivityLog() {
  const { companies } = useCompaniesStore();

  const activities = companies
    .filter(company => company.lastCommunication)
    .map(company => ({
      id: company.lastCommunication!.id,
      companyName: company.name,
      ...company.lastCommunication!
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold">Recent Activities</h2>
        </div>
      </div>
      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {activities.map(activity => (
          <div key={activity.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{activity.companyName}</p>
                <p className="text-sm text-gray-500">
                  {COMMUNICATION_TYPES.find(t => t.value === activity.type)?.label}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {format(new Date(activity.date), 'PPp')}
              </span>
            </div>
            {activity.notes && (
              <p className="mt-1 text-sm text-gray-600">{activity.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}