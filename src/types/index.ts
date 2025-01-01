export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface Company {
  id: string;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number; // in days
  lastCommunication?: Communication;
}

export interface Communication {
  id: string;
  companyId: string;
  type: CommunicationType;
  date: Date;
  notes: string;
  completed: boolean;
}

export type CommunicationType = 'linkedin_post' | 'linkedin_message' | 'email' | 'phone_call' | 'other';