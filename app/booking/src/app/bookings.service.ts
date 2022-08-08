import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from './Booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.BASE_URL}/bookings`);
  }

  createBooking(date: string, name: string, email: string): Observable<Booking> {
    return this.http.post<Booking>(`${this.BASE_URL}/bookings`, { date, name, email });
  }
}
