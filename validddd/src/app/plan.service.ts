import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from './plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl = 'http://localhost:8080/subscriber/plans'; // Adjust the URL according to your backend endpoint

  constructor(private http: HttpClient) { }

  getAllPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl);
  }
}
