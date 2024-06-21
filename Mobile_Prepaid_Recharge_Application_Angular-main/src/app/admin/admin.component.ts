import { Component, OnInit } from '@angular/core';
import { Subscriber } from '../subscriber';
import { Recharge } from '../recharge';
import { SubscriberService } from '../subscriber.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  expiringSubscribers: Subscriber[] = [];
  selectedSubscriber: Subscriber | null = null;
  rechargeHistory: Recharge[] = [];
  searchedSubscriber: Subscriber | null = null;

  constructor(private subscriberService: SubscriberService) { }

  ngOnInit() {
    this.fetchExpiringSubscribers();
  }

  fetchExpiringSubscribers() {
    const days = 3; // Plans expiring in the next 3 days
    this.subscriberService.getSubscribersWithExpiringPlans(days).subscribe(
      (subscribers) => {
        this.expiringSubscribers = subscribers;
      },
      (error) => {
        console.log('Error fetching expiring subscribers:', error);
      }
    );
  }

  viewRechargeHistory(subscriber: Subscriber) {
    this.selectedSubscriber = subscriber;
    this.subscriberService.getSubscriberRechargeHistory(subscriber.id!).subscribe(
      (recharges) => {
        this.rechargeHistory = recharges;
      },
      (error) => {
        console.log('Error fetching recharge history:', error);
      }
    );
  }

  searchUserById(id: number) {
    this.subscriberService.getSubscriberById(id).subscribe(
      (subscriber) => {
        this.searchedSubscriber = subscriber;
      },
      (error) => {
        console.log('Error fetching subscriber by ID:', error);
      }
    );
  }
}