import { useState } from 'react';
import type { Company } from '../../types';
import { Plus, X } from 'lucide-react';

interface CompanyFormProps {
  initialData?: Partial<Company>;
  onSubmit: (data: Omit<Company, 'id'>) => void;
  onCancel: () => void;
}

export default function CompanyForm({ initialData, onSubmit, onCancel }: CompanyFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    linkedinProfile: initialData?.linkedinProfile || '',
    emails: initialData?.emails || [''],
    phoneNumbers: initialData?.phoneNumbers || [''],
    comments: initialData?.comments || '',
    communicationPeriodicity: initialData?.communicationPeriodicity || 7
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      emails: formData.emails.filter(Boolean),
      phoneNumbers: formData.phoneNumbers.filter(Boolean)
    });
  };

  const addField = (field: 'emails' | 'phoneNumbers') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field: 'emails' | 'phoneNumbers', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field: 'emails' | 'phoneNumbers', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
        <input
          type="url"
          value={formData.linkedinProfile}
          onChange={e => setFormData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Addresses</label>
        {formData.emails.map((email, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="email"
              value={email}
              onChange={e => updateField('emails', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            {formData.emails.length > 1 && (
              <button
                type="button"
                onClick={() => removeField('emails', index)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('emails')}
          className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
        >
          <Plus className="w-4 h-4" />
          Add Email
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Numbers</label>
        {formData.phoneNumbers.map((phone, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="tel"
              value={phone}
              onChange={e => updateField('phoneNumbers', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
            {formData.phoneNumbers.length > 1 && (
              <button
                type="button"
                onClick={() => removeField('phoneNumbers', index)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField('phoneNumbers')}
          className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
        >
          <Plus className="w-4 h-4" />
          Add Phone Number
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Communication Periodicity (days)</label>
        <input
          type="number"
          min="1"
          value={formData.communicationPeriodicity}
          onChange={e => setFormData(prev => ({ ...prev, communicationPeriodicity: parseInt(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          value={formData.comments}
          onChange={e => setFormData(prev => ({ ...prev, comments: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          {initialData ? 'Update' : 'Create'} Company
        </button>
      </div>
    </form>
  );
}