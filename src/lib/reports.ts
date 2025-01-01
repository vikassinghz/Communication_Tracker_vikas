import { Company, Communication } from '../types';
import { COMMUNICATION_TYPES } from '../store/communications';

export function generateCSVReport(companies: Company[]): string {
  const headers = ['Company Name', 'Location', 'Last Communication Date', 'Communication Type', 'Notes'];
  const rows = companies.map(company => [
    company.name,
    company.location,
    company.lastCommunication ? new Date(company.lastCommunication.date).toLocaleDateString() : 'N/A',
    company.lastCommunication ? 
      COMMUNICATION_TYPES.find(t => t.value === company.lastCommunication?.type)?.label : 'N/A',
    company.lastCommunication?.notes || 'N/A'
  ]);

  return [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}