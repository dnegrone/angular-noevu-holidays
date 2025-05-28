import { Component, OnInit, inject, signal, effect, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { HolidayService } from '../../../core/services/holiday.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Holiday, Subdivision } from '../../../core/models/holiday.model';
import { DaysOfWeek } from '../../../core/enums/days-of-week.enum';

@Component({
  selector: 'app-holiday-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './holiday-tracker.component.html',
  styleUrl: './holiday-tracker.component.scss'
})
export class HolidayTrackerComponent implements OnInit {
  private holidayService = inject(HolidayService);
  private localStorageService = inject(LocalStorageService);
  private cdr = inject(ChangeDetectorRef);

  public today: Date = new Date();
  public currentYear = signal(new Date().getFullYear());
  public years = signal<number[]>([this.currentYear() - 1, this.currentYear(), this.currentYear() + 1]);
  
  public daysOfWeek = signal<{ name: string; value: DaysOfWeek}[]>([
    { name: 'Monday', value: DaysOfWeek.Monday },
    { name: 'Tuesday', value: DaysOfWeek.Tuesday },
    { name: 'Wednesday', value: DaysOfWeek.Wednesday },
    { name: 'Thursday', value: DaysOfWeek.Thursday },
    { name: 'Friday', value: DaysOfWeek.Friday },
  ]);

  public DaysOfWeek = DaysOfWeek;

  public selectedWorkDays = signal<DaysOfWeek[]>([
    DaysOfWeek.Monday,
    DaysOfWeek.Tuesday,
    DaysOfWeek.Wednesday,
    DaysOfWeek.Thursday,
    DaysOfWeek.Friday
  ]);

  public cantons = signal<{ shortname: string; code: string }[]>([
    { shortname: 'AG', code: 'CH-AG' },
    { shortname: 'BE', code: 'CH-BE' },
    { shortname: 'GE', code: 'CH-GE' },
    { shortname: 'SG', code: 'CH-SG' },
    { shortname: 'ZH', code: 'CH-ZH' },
  ]);
  
  // Setting Zurich's as a default value
  public selectedCantonCode = signal<string>('CH-ZH');
  
  public holidays = signal<Holiday[]>([]);
  public filteredHolidays = signal<Holiday[]>([]);
  public holidaysOnWorkDays = signal<Holiday[]>([]);

  public isLoading = signal<boolean>(false);
  public errorMessage = signal<string | null>(null);
  
  constructor() {
    effect(() => {
      const year = this.currentYear();
      const cantonCode = this.selectedCantonCode();
      const workDays = this.selectedWorkDays();
      this.fetchAndFilterHolidays(year, cantonCode, workDays);
    });
  }

  ngOnInit():void {
    this.loadSettings();
    this.cdr.detectChanges();
  }

  // Load settings from LocalStorage
  private loadSettings():void {
    try {
      const savedCanton = this.localStorageService.getItem('selectedCantonCode');
      const savedYear = this.localStorageService.getItem('selectedYear');
      const savedWorkDays = this.localStorageService.getItem('selectedWorkDays');

      if(savedCanton) {
        this.selectedCantonCode.set(savedCanton);
      }
      if(savedYear) {
        this.currentYear.set(parseInt(savedYear, 10));
      }
      if (savedWorkDays) {
        this.selectedWorkDays.set(JSON.parse(savedWorkDays) as DaysOfWeek[]);
      }
    }
    catch (e) {
      console.error('Error loading settings.', e);
    }
  }

  // Save settings on LocalStorage
  private saveSettings(): void {
    this.localStorageService.setItem('selectedCantonCode', this.selectedCantonCode());
    this.localStorageService.setItem('selectedYear', this.currentYear().toString());
    this.localStorageService.setItem('selectedWorkDays', JSON.stringify(this.selectedWorkDays()));
  }

  // Fetch and Filter Holidays
  private fetchAndFilterHolidays(year: number, cantonCode: string, workDays: DaysOfWeek[]): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.holidayService.getPublicHolidays(year, cantonCode).subscribe({
      next: (allHolidays) => {
        this.holidays.set(allHolidays);
        this.applyFilterAndHighlight(allHolidays, cantonCode, workDays);
        this.isLoading.set(false);
        this.saveSettings();
      },
      error: (err) => {
        console.error('Error fetching holiday:', err);
        this.errorMessage.set(err.message || 'Failed to load holidays. Please, try again.');
        this.isLoading.set(false);
      }
    });
  }

  // Apply Filter and Highlight selected
  private applyFilterAndHighlight(allHolidays: Holiday[], selectedCantonCode: string, selectedWorkDays: DaysOfWeek[]): void {
    const holidaysForCanton = allHolidays.filter(holiday => {
      if (holiday.nationwide) {
        return true;
      }
      return holiday.subdivisions?.some(subdivision => subdivision.code ===selectedCantonCode || subdivision.code?.startsWith(selectedCantonCode + '-')) ?? false;
    });

    this.filteredHolidays.set(holidaysForCanton);

    const holidaysOnWorkDays: Holiday[] = []
    const today = new Date();
    today.setHours(0,0,0,0);

    holidaysForCanton.forEach(holiday => {
      const holidayDate = new Date(holiday.startDate);
      holidayDate.setHours(0,0,0,0);

      const daysOfWeek = holidayDate.getDay() as DaysOfWeek;

      const isOnWorkDay = selectedWorkDays.includes(daysOfWeek);
      const isFutureHoliday = holidayDate >= this.today;
      const isTodayHoliday = holidayDate.getTime() === this.today.getTime();

      holidaysOnWorkDays.push({
        ...holiday,
        _isOnWorkDay: isOnWorkDay,
        _isFutureHoliday: isFutureHoliday,
        _isTodayHoliday: isTodayHoliday,
        _dayOfWeekName: this.getDayName(daysOfWeek as DaysOfWeek)
      });
    })

    this.holidaysOnWorkDays.set(holidaysOnWorkDays);
  }

  // Getting the day of the week
  private getDayName(day: DaysOfWeek): string {
    switch (day) {
      case DaysOfWeek.Sunday: return 'Sunday';
      case DaysOfWeek.Monday: return 'Monday';
      case DaysOfWeek.Tuesday: return 'Tuesday';
      case DaysOfWeek.Wednesday: return 'Wednesday';
      case DaysOfWeek.Thursday: return 'Thursday';
      case DaysOfWeek.Friday: return 'Friday';
      case DaysOfWeek.Saturday: return 'Saturday';
      default: return '';
    }
  }

  // Change Canton
  onCantonChange(selectedCode: string): void {
    this.selectedCantonCode.set(selectedCode);
  }

  // Change Year
  onYearChange(selectedYear: string): void {
    this.currentYear.set(parseInt(selectedYear, 10));
  }

  // Change Workday
  onWorkDayChange(day: DaysOfWeek, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    let currentWorkDays = this.selectedWorkDays();
    
    if (checkbox.checked) {
      currentWorkDays = [...currentWorkDays, day].sort((a, b) => a - b);
    }
    else {
      currentWorkDays = currentWorkDays.filter(dayValue => dayValue !== day);
    }
    this.selectedWorkDays.set(currentWorkDays);
  }

  // Getting Canton name
  get selectedCantonDisplayName(): string {
    const selectedCode = this.selectedCantonCode();
    const foundCanton = this.cantons().find(c => c.code === selectedCode);
    return foundCanton ? foundCanton.shortname : selectedCode;
  }
}
