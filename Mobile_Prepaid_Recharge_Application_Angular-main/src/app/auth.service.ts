import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscriber } from './subscriber';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/subscriber'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Subscriber | null> {
    const body = { email, password };
    return this.http.post<Subscriber>(`${this.apiUrl}/login`, body);
  }
}