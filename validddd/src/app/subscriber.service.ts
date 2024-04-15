import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from './subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  private baseUrl = 'http://localhost:8080/subscriber'; // Replace this with your API base URL

  constructor(private http: HttpClient) { }

  validateSubscriber(mobileNumber: string): Observable<Subscriber> {
    return this.http.get<Subscriber>(`${this.baseUrl}/validate/${mobileNumber}`);
  }


  
}
