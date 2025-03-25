import React, { useState, useEffect } from 'react';

// Full Calendar Component
export const FullCalendar = ({
  label,
  required = false,
  name,
  value = '',
  onChange,
  minDate,
  maxDate,
  className = "",
  helperText = "",
  errorMessage = "",
  isError = false
}) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value) {
      setViewDate(new Date(value));
    }
  }, [value]);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (year, month, day) => {
    const newDate = new Date(year, month, day);
    onChange({
      target: {
        name,
        value: formatDateForInput(newDate)
      }
    });
    setIsOpen(false);
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsFocused(true);
    }
  };

  const renderCalendarGrid = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const selectedDate = value ? new Date(value) : null;

    const isDateInRange = (year, month, day) => {
      const date = new Date(year, month, day);
      const dateStr = formatDateForInput(date);
      if (minDate && dateStr < minDate) return false;
      if (maxDate && dateStr > maxDate) return false;
      return true;
    };

    const isSelected = (year, month, day) => {
      if (!selectedDate) return false;
      return (
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === day
      );
    };

    const isToday = (year, month, day) => {
      return (
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day
      );
    };

    const weeks = [];
    let days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const inRange = isDateInRange(year, month, day);
      const selected = isSelected(year, month, day);
      const isTodayDate = isToday(year, month, day);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => inRange && handleDateSelect(year, month, day)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
            !inRange ? 'text-gray-300 cursor-not-allowed' :
            selected ? 'bg-blue-500 text-white hover:bg-blue-600' :
            isTodayDate ? 'border border-blue-500 text-blue-600 hover:bg-blue-50' :
            'text-gray-700 hover:bg-gray-100'
          } transition-colors duration-200`}
          disabled={!inRange}
        >
          {day}
        </button>
      );

      if ((firstDayOfMonth + day) % 7 === 0 || day === daysInMonth) {
        weeks.push(
          <div key={`week-${weeks.length}`} className="grid grid-cols-7 gap-1">
            {days}
          </div>
        );
        days = [];
      }
    }
    return weeks;
  };

  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  const yearNum = viewDate.getFullYear();

  return (
    <div className={`col-span-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        type="date" 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
      />
    </div>
  );
};

// Custom Date Picker Component (for Date of Birth selection)
export const CustomDatePicker = ({ 
  name, 
  value, 
  onChange, 
  label = "Date of Birth", 
  required = true 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        max={new Date().toISOString().split("T")[0]}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};
