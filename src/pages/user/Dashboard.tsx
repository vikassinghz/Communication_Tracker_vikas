import { useState } from 'react';
import { MessageSquare, Users } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CommunicationForm from '../../components/communications/CommunicationForm';
import CommunicationsOverview from '../../components/communications/CommunicationsOverview';
import CompanySelection from '../../components/communications/CompanySelection';
import BulkCommunicationModal from '../../components/communications/BulkCommunicationModal';
import NotificationBadge from '../../components/communications/NotificationBadge';
import CalendarView from '../../components/calendar/CalendarView';
import CommunicationChart from '../../components/reports/CommunicationChart';
import CommunicationStats from '../../components/reports/CommunicationStats';
import ActivityLog from '../../components/reports/ActivityLog';
import DownloadReports from '../../components/reports/DownloadReports';
import { useCompaniesStore } from '../../store/companies';
import { useCommunicationsStore } from '../../store/communications';
import type { Company } from '../../types';

export default function UserDashboard() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const { companies } = useCompaniesStore();
  const { addCommunication } = useCommunicationsStore();

  const handleAddCommunication = (data: any) => {
    addCommunication(data);
    setSelectedCompany(null);
  };

  const handleBulkCommunication = (communications: any[]) => {
    communications.forEach(addCommunication);
    setShowBulkModal(false);
    setSelectedCompanies([]);
  };

  return (
    <DashboardLayout title="User Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Communications Dashboard</h1>
          <div className="flex items-center gap-4">
            <DownloadReports />
            <NotificationBadge />
          </div>
        </div>

        <CommunicationsOverview onLogCommunication={setSelectedCompany} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarView />
          <div className="space-y-6">
            <CommunicationChart />
            <CommunicationStats />
            <ActivityLog />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              Select Companies
            </h2>
            {selectedCompanies.length > 0 && (
              <button
                onClick={() => setShowBulkModal(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Log Communication ({selectedCompanies.length})
              </button>
            )}
          </div>
          <div className="p-6">
            <CompanySelection
              companies={companies}
              onSelect={setSelectedCompanies}
            />
          </div>
        </div>

        {selectedCompany && (
          <CommunicationForm
            company={selectedCompany}
            onSubmit={handleAddCommunication}
            onCancel={() => setSelectedCompany(null)}
          />
        )}

        {showBulkModal && (
          <BulkCommunicationModal
            companies={selectedCompanies}
            onSubmit={handleBulkCommunication}
            onClose={() => setShowBulkModal(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}