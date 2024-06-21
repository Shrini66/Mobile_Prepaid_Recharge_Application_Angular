import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscriber } from './subscriber';
import { Recharge } from './recharge';
import { Plan } from './plan';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private apiUrl = 'http://localhost:8082'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  registerSubscriber(subscriber: Subscriber): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscriber/savesubscriber`, subscriber);
  }

  setSubscriber(subscriber: Subscriber): void {
    localStorage.setItem('subscriber', JSON.stringify(subscriber));
  }

  getSubscriber(): Subscriber | null {
    const subscriberString = localStorage.getItem('subscriber');
    return subscriberString ? JSON.parse(subscriberString) : null;
  }

  getSubscribersWithExpiringPlans(days: number): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(`${this.apiUrl}/admin/expiring?days=${days}`);
  }

  getSubscriberRechargeHistory(subscriberId: number): Observable<Recharge[]> {
    return this.http.get<Recharge[]>(`${this.apiUrl}/admin/subscriber/${subscriberId}`);
  }

  getSubscriberById(id: number): Observable<Subscriber> {
    return this.http.get<Subscriber>(`${this.apiUrl}/subscriber/${id}`);
  }
  getAllPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.apiUrl}/subscriber/plans`);
  }
  removeSubscriber(): void {
    localStorage.removeItem('subscriber');
  }
}