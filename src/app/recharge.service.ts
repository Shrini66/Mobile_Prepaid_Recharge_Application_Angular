import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recharge } from './recharge';
import { RechargeRequest } from './recharge-request';
import { Subscriber } from './subscriber';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {
  private apiUrl = 'http://localhost:8082/recharge'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  rechargeSubscriber(rechargeRequest: RechargeRequest, subscriber: Subscriber): Observable<Recharge> {
    const rechargeDate = new Date(); // Get the current date
    const planExpirationDate = new Date(rechargeDate.getTime() + (28 * 24 * 60 * 60 * 1000)); // Calculate the plan expiration date (28 days from the recharge date)

    const recharge: Recharge = new Recharge(
      subscriber,
      rechargeRequest.plan,
      rechargeDate,
      planExpirationDate,
      rechargeRequest.paymentMethod
    );

    return this.http.post<Recharge>(`${this.apiUrl}/save`, recharge);
  }
  
  saveRecharge(recharge: Recharge): Observable<Recharge> {
    return this.http.post<Recharge>(`${this.apiUrl}/save`, recharge);
  }
}
