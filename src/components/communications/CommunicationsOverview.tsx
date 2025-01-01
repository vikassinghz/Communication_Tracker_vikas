import { format } from 'date-fns';
import { AlertCircle, Clock } from 'lucide-react';
import { useCompaniesStore, getCompanyStatus } from '../../store/companies';
import { COMMUNICATION_TYPES } from '../../store/communications';
import type { Company } from '../../types';

interface CommunicationListProps {
  companies: Company[];
  title: string;
  icon: React.ReactNode;
  onLogCommunication: (company: Company) => void;
}

function CommunicationList({ companies, title, icon, onLogCommunication }: CommunicationListProps) {
  if (companies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No communications {title.toLowerCase()}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {companies.map(company => (
        <div
          key={company.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">
              Last communication:{' '}
              {company.lastCommunication
                ? `${format(new Date(company.lastCommunication.date), 'PPP')} via ${
                    COMMUNICATION_TYPES.find(t => t.value === company.lastCommunication!.type)?.label
                  }`
                : 'Never'}
            </p>
          </div>
          <button
            onClick={() => onLogCommunication(company)}
            className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Log Communication
          </button>
        </div>
      ))}
    </div>
  );
}

interface CommunicationsOverviewProps {
  onLogCommunication: (company: Company) => void;
}

export default function CommunicationsOverview({ onLogCommunication }: CommunicationsOverviewProps) {
  const { companies } = useCompaniesStore();

  const overdueCompanies = companies.filter(company => getCompanyStatus(company) === 'overdue');
  const dueTodayCompanies = companies.filter(company => getCompanyStatus(company) === 'due-today');

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-red-50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-red-900">Overdue Communications</h2>
          {overdueCompanies.length > 0 && (
            <span className="px-2 py-1 text-sm bg-red-100 text-red-800 rounded-full">
              {overdueCompanies.length}
            </span>
          )}
        </div>
        <CommunicationList
          companies={overdueCompanies}
          title="Overdue"
          icon={<AlertCircle className="w-4 h-4" />}
          onLogCommunication={onLogCommunication}
        />
      </div>

      <div className="bg-yellow-50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-yellow-600" />
          <h2 className="text-lg font-semibold text-yellow-900">Due Today</h2>
          {dueTodayCompanies.length > 0 && (
            <span className="px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
              {dueTodayCompanies.length}
            </span>
          )}
        </div>
        <CommunicationList
          companies={dueTodayCompanies}
          title="Due Today"
          icon={<Clock className="w-4 h-4" />}
          onLogCommunication={onLogCommunication}
        />
      </div>
    </div>
  );
}