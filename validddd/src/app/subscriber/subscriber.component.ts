import { Component } from '@angular/core';
import { Subscriber } from '../subscriber';
import { SubscriberService } from '../subscriber.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrl: './subscriber.component.css'
})
export class SubscriberComponent {

  mobileNumber: string ="";
  subscriber: Subscriber | undefined;
  message: string ="";

  constructor(private router: Router,private subscriberService: SubscriberService) { }

  validateSubscriber() {
    console.log("Hello");
    this.subscriberService.validateSubscriber(this.mobileNumber).subscribe(
      (data: Subscriber) => {
        this.subscriber = data;
        if (this.subscriber && this.subscriber.id) {
          this.message = 'Number is already validated. You can view recharge plans';
        } else {
          this.message = 'Please validate the number.';
        }
      },
      (error) => {
        console.error('Error:', error);
        this.message = 'An error occurred while validating the number.';
      }
    );
  }


  viewRechargePlans() {
    this.router.navigateByUrl('/plan'); // Navigate to the PlanComponent
  }
}
