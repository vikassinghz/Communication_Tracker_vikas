import { format } from 'date-fns';
import { Building2, Calendar, Phone, Mail } from 'lucide-react';
import type { Company } from '../../types';
import { getCompanyStatus } from '../../store/companies';
import { COMMUNICATION_TYPES } from '../../store/communications';

interface CompanyCardProps {
  company: Company;
  onLogCommunication: () => void;
}

export default function CompanyCard({ company, onLogCommunication }: CompanyCardProps) {
  const status = getCompanyStatus(company);
  
  const getStatusColor = () => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'due-today':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{company.location}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Communication every {company.communicationPeriodicity} days
          </span>
        </div>
        {company.phoneNumbers[0] && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{company.phoneNumbers[0]}</span>
          </div>
        )}
        {company.emails[0] && (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{company.emails[0]}</span>
          </div>
        )}
      </div>

      {company.lastCommunication && (
        <div className="border-t border-gray-100 pt-4 mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Last Communication</h4>
          <div className="text-sm text-gray-600">
            <p>
              {format(new Date(company.lastCommunication.date), 'PPP')} via{' '}
              {COMMUNICATION_TYPES.find(t => t.value === company.lastCommunication!.type)?.label}
            </p>
            <p className="mt-1">{company.lastCommunication.notes}</p>
          </div>
        </div>
      )}

      <button
        onClick={onLogCommunication}
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        Log Communication
      </button>
    </div>
  );
}