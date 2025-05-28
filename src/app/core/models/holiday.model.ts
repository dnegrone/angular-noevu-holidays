export interface Holiday {
  id: string;
  startDate: string;
  endDate: string;
  type: 'Public' | 'Optional' | 'Bank';
  name: HolidayName[];
  regionalScope: 'National' | 'Regional' | 'Local';
  temporalScope: 'FullDay' | 'HalfDay';
  nationwide: boolean;
  subdivisions?: Subdivision[];
  _isOnWorkDay?: boolean;
  _isFutureHoliday?: boolean;
  _isTodayHoliday?: boolean;
  _dayOfWeekName?: string;
}

export interface HolidayName {
  language: string;
  text: string;
}

export interface Subdivision {
  code: string;
  shortName: string;
}
