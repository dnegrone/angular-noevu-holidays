import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DaysOfWeek } from '../../../../core/enums/days-of-week.enum';

@Component({
  selector: 'app-workday-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workday-checkbox.component.html',
  styleUrl: './workday-checkbox.component.scss'
})
export class WorkdayCheckboxComponent {
  @Input({ required: true }) dayName!: string;
  @Input({ required: true }) dayValue!: DaysOfWeek;
  @Input({ transform: booleanAttribute }) isChecked: boolean = false;

  @Output() dayChange = new EventEmitter<{ day: DaysOfWeek, checked: boolean }>();

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.dayChange.emit({ day: this.dayValue, checked: checkbox.checked });
  } 
}
