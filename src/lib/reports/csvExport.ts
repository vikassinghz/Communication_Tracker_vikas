import { Company } from '../../types';
import { COMMUNICATION_TYPES } from '../../store/communications';

export function generateCSV(companies: Company[]): string {
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