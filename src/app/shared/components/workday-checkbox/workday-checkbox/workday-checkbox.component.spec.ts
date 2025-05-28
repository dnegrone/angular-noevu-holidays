import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayCheckboxComponent } from './workday-checkbox.component';

describe('WorkdayCheckboxComponent', () => {
  let component: WorkdayCheckboxComponent;
  let fixture: ComponentFixture<WorkdayCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkdayCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkdayCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
