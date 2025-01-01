import { create } from 'zustand';
import { addDays, isBefore, isToday } from 'date-fns';
import type { Company } from '../types';

interface CompaniesState {
  companies: Company[];
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (id: string, company: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
}

// Mock initial data
const initialCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    linkedinProfile: 'linkedin.com/company/techcorp',
    emails: ['contact@techcorp.com', 'sales@techcorp.com'],
    phoneNumbers: ['+1 (555) 123-4567'],
    comments: 'Key enterprise client',
    communicationPeriodicity: 7,
    lastCommunication: {
      id: '1',
      companyId: '1',
      type: 'email',
      date: addDays(new Date(), -10), // Overdue
      notes: 'Discussed upcoming project requirements',
      completed: true
    }
  },
  {
    id: '2',
    name: 'InnovateLabs',
    location: 'New York, NY',
    linkedinProfile: 'linkedin.com/company/innovatelabs',
    emails: ['info@innovatelabs.com'],
    phoneNumbers: ['+1 (555) 987-6543'],
    comments: 'Potential partnership opportunity',
    communicationPeriodicity: 14,
    lastCommunication: {
      id: '2',
      companyId: '2',
      type: 'phone_call',
      date: new Date(), // Due today
      notes: 'Quarterly review call',
      completed: true
    }
  },
  {
    id: '3',
    name: 'Future Dynamics',
    location: 'Austin, TX',
    linkedinProfile: 'linkedin.com/company/futuredynamics',
    emails: ['contact@futuredynamics.com'],
    phoneNumbers: ['+1 (555) 246-8135'],
    comments: 'Growing startup client',
    communicationPeriodicity: 30,
    lastCommunication: {
      id: '3',
      companyId: '3',
      type: 'linkedin_message',
      date: addDays(new Date(), -5),
      notes: 'Sent product update information',
      completed: true
    }
  }
];

export const useCompaniesStore = create<CompaniesState>((set) => ({
  companies: initialCompanies,
  addCompany: (company) =>
    set((state) => ({
      companies: [...state.companies, { ...company, id: crypto.randomUUID() }]
    })),
  updateCompany: (id, updatedCompany) =>
    set((state) => ({
      companies: state.companies.map((company) =>
        company.id === id ? { ...company, ...updatedCompany } : company
      )
    })),
  deleteCompany: (id) =>
    set((state) => ({
      companies: state.companies.filter((company) => company.id !== id)
    }))
}));

export const getCompanyStatus = (company: Company) => {
  if (!company.lastCommunication) return 'upcoming';
  
  const nextDue = addDays(company.lastCommunication.date, company.communicationPeriodicity);
  
  if (isBefore(nextDue, new Date())) return 'overdue';
  if (isToday(nextDue)) return 'due-today';
  return 'upcoming';
};