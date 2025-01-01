import { Bell } from 'lucide-react';
import { useCompaniesStore, getCompanyStatus } from '../../store/companies';

export default function NotificationBadge() {
  const { companies } = useCompaniesStore();
  
  const overdueCount = companies.filter(company => getCompanyStatus(company) === 'overdue').length;
  const dueTodayCount = companies.filter(company => getCompanyStatus(company) === 'due-today').length;
  const totalCount = overdueCount + dueTodayCount;

  if (totalCount === 0) return null;

  return (
    <div className="relative">
      <Bell className="w-6 h-6 text-gray-600" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {totalCount}
      </span>
    </div>
  );
}