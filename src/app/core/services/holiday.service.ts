import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { Holiday } from '../models/holiday.model';
import { error } from 'console';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private http = inject(HttpClient);
  private apiUrl = 'https://openholidaysapi.org/PublicHolidays'
  
  constructor() { }

  getPublicHolidays(year: number, subdivisionCode?: string): Observable<Holiday[]> {
    let params = new HttpParams()
      .set('countryIsoCode', 'CH')
      .set('validFrom', `${year}-01-01`)
      .set('validTo', `${year}-12-31`)
      .set('languageIsoCode', 'EN')
    
    if(subdivisionCode) {
      params = params.set('subdivisionCode', subdivisionCode);
    }
    
    return this.http.get<Holiday[]>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error fetching holidays: ', error);
        return throwError(() => new Error('Failed loading holidays. Please, try again.'));
      })
    )
  }
}
