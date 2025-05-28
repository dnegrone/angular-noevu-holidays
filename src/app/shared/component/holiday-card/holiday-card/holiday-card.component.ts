import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Holiday } from '../../../../core/models/holiday.model';

@Component({
  selector: 'app-holiday-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './holiday-card.component.html',
  styleUrl: './holiday-card.component.scss'
})
export class HolidayCardComponent {
  @Input({ required: true }) holiday!: Holiday;
}
