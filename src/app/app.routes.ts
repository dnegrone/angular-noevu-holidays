import { Routes } from '@angular/router';
import { HolidayTrackerComponent } from './features/holiday-tracker/holiday-tracker/holiday-tracker.component';

export const routes: Routes = [
    { path: '', component: HolidayTrackerComponent, pathMatch: 'full' },
];
