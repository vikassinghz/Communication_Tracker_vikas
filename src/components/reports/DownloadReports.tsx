import { Menu } from '@headlessui/react';
import { FileDown } from 'lucide-react';
import { useCompaniesStore } from '../../store/companies';
import { generateCSV } from '../../lib/reports/csvExport';
import { generatePDF } from '../../lib/reports/pdfExport';

export default function DownloadReports() {
  const { companies } = useCompaniesStore();

  const handleDownloadCSV = () => {
    const csv = generateCSV(companies);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `communications-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDownloadPDF = () => {
    const doc = generatePDF(companies);
    doc.save(`communications-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
        <FileDown className="w-4 h-4" />
        Download Report
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleDownloadCSV}
              className={`${
                active ? 'bg-gray-100' : ''
              } block w-full text-left px-4 py-2 text-sm text-gray-700`}
            >
              Download as CSV
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleDownloadPDF}
              className={`${
                active ? 'bg-gray-100' : ''
              } block w-full text-left px-4 py-2 text-sm text-gray-700`}
            >
              Download as PDF
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}