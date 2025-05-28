import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { HolidayService } from './holiday.service';

describe('HolidayService', () => {
  let service: HolidayService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HolidayService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(HolidayService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
