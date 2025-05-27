export interface Holiday {
  id: string;
  startDate: string;
  endDate: string;
  type: 'Public' | 'Optional' | 'Bank';
  name: {
    language: string;
    text: string;
  }[];
  regionalScope: 'National' | 'Regional' | 'Local';
  temporalScope: 'FullDay' | 'HalfDay';
  nationwide: boolean;
  subdivisions?: {
    code: string;
    shortName: string;
  }[];
}

export interface HolidayName {
  language: string;
  text: string;
}

export interface Subdivision {
  code: string;
  shortName: string;
}