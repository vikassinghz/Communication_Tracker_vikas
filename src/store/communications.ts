import { create } from 'zustand';
import type { Communication, CommunicationType } from '../types';

interface CommunicationsState {
  communications: Communication[];
  addCommunication: (communication: Omit<Communication, 'id'>) => void;
  updateCommunication: (id: string, communication: Partial<Communication>) => void;
  deleteCommunication: (id: string) => void;
}

export const useCommunicationsStore = create<CommunicationsState>((set) => ({
  communications: [],
  addCommunication: (communication) =>
    set((state) => ({
      communications: [...state.communications, { ...communication, id: crypto.randomUUID() }]
    })),
  updateCommunication: (id, updatedCommunication) =>
    set((state) => ({
      communications: state.communications.map((communication) =>
        communication.id === id ? { ...communication, ...updatedCommunication } : communication
      )
    })),
  deleteCommunication: (id) =>
    set((state) => ({
      communications: state.communications.filter((communication) => communication.id !== id)
    }))
}));

export const COMMUNICATION_TYPES: { value: CommunicationType; label: string }[] = [
  { value: 'linkedin_post', label: 'LinkedIn Post' },
  { value: 'linkedin_message', label: 'LinkedIn Message' },
  { value: 'email', label: 'Email' },
  { value: 'phone_call', label: 'Phone Call' },
  { value: 'other', label: 'Other' }
];