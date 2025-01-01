import { useState } from 'react';
import { Check } from 'lucide-react';
import type { Company } from '../../types';

interface CompanySelectionProps {
  companies: Company[];
  onSelect: (selectedCompanies: Company[]) => void;
}

export default function CompanySelection({ companies, onSelect }: CompanySelectionProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleCompany = (company: Company) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(company.id)) {
      newSelected.delete(company.id);
    } else {
      newSelected.add(company.id);
    }
    setSelectedIds(newSelected);
    onSelect(companies.filter(c => newSelected.has(c.id)));
  };

  return (
    <div className="space-y-2">
      {companies.map(company => (
        <div
          key={company.id}
          onClick={() => toggleCompany(company)}
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
            selectedIds.has(company.id)
              ? 'bg-primary-50 border-primary-200'
              : 'bg-white hover:bg-gray-50'
          } border`}
        >
          <div className={`w-5 h-5 rounded border flex items-center justify-center ${
            selectedIds.has(company.id)
              ? 'bg-primary-600 border-primary-600'
              : 'border-gray-300'
          }`}>
            {selectedIds.has(company.id) && <Check className="w-3 h-3 text-white" />}
          </div>
          <div>
            <p className="font-medium text-gray-900">{company.name}</p>
            <p className="text-sm text-gray-500">{company.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}