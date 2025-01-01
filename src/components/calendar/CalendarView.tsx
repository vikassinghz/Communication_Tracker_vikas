import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCompaniesStore } from '../../store/companies';
import { COMMUNICATION_TYPES } from '../../store/communications';
import type { Communication } from '../../types';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { companies } = useCompaniesStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const communications = companies.flatMap(company => 
    company.lastCommunication ? [{ ...company.lastCommunication, companyName: company.name }] : []
  );

  const getCommunicationsForDay = (date: Date) => {
    return communications.filter(comm => 
      isSameDay(new Date(comm.date), date)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Communication Calendar</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {days.map(day => {
          const dayComms = getCommunicationsForDay(day);
          return (
            <div
              key={day.toISOString()}
              className="min-h-[100px] bg-white p-2"
            >
              <div className="text-sm text-gray-500">{format(day, 'd')}</div>
              <div className="mt-1 space-y-1">
                {dayComms.map((comm, idx) => (
                  <div
                    key={idx}
                    className="text-xs p-1 rounded bg-primary-50 text-primary-700"
                    title={`${comm.companyName} - ${comm.notes}`}
                  >
                    {comm.companyName}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}