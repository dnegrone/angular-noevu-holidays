import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HolidayService } from './core/services/holiday.service';
import { Holiday } from './core/models/holiday.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    private holidayService = inject(HolidayService);
    public holidays: Holiday[] = [];
    public errorMessage: string | null = null;
    public isLoading: boolean = false;

    public currentYear = new Date().getFullYear()

    constructor () {}

    ngOnInit(): void {
      const currentYear = new Date().getFullYear();
      const zurichCantonCode = 'CH-ZH';

      this.isLoading = true;
      this.errorMessage = null;
      this.holidayService.getPublicHolidays(currentYear, zurichCantonCode).subscribe({
        next: (data) => {
          this.holidays = data;
          console.log('Zurich Holidays 2025: ', data);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to fetch', err);
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      });
    }


}
