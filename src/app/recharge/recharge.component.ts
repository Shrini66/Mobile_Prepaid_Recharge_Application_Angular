import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber } from '../subscriber';
import { Plan } from '../plan';
import { Recharge } from '../recharge';
import { SubscriberService } from '../subscriber.service';
import { RechargeService } from '../recharge.service';
import { RechargeRequest } from '../recharge-request';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  rechargeForm: FormGroup;
  subscriber: Subscriber | null = null;
  plans: Plan[] = [];
  selectedPlan: Plan | null = null;
  paymentMethods: string[] = ['UPI', 'Bank Transfer', 'Credit/Debit Card'];
  selectedPaymentMethod: string = '';
  rechargeSuccessful: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private subscriberService: SubscriberService,
    private rechargeService: RechargeService
  ) {
    this.rechargeForm = this.formBuilder.group({
      mobileNumber: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.subscriber = this.subscriberService.getSubscriber();
    if (!this.subscriber) {
      this.router.navigate(['/login']);
    } else {
      this.rechargeForm = this.formBuilder.group({
        mobileNumber: [this.subscriber.mobileNumber, Validators.required],
        paymentMethod: ['', Validators.required]
      });
      this.fetchPlans();
    }
  }

  fetchPlans() {
    this.subscriberService.getAllPlans().subscribe(
      (plans) => {
        this.plans = plans;
      },
      (error) => {
        console.log('Error fetching plans:', error);
      }
    );
  }

  selectPlan(plan: Plan) {
    this.selectedPlan = plan;
  }

  showSuccessMessageWithTimeout() {
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  showErrorMessageWithTimeout(message: string) {
    this.errorMessage = message;
    this.showErrorMessage = true;
    setTimeout(() => {
      this.showErrorMessage = false;
      this.errorMessage = '';
    }, 3000);
  }

  onSubmit() {
    if (this.rechargeForm.valid && this.selectedPlan && this.selectedPaymentMethod) {
      const mobileNumber = this.rechargeForm.get('mobileNumber')?.value;
      const paymentMethod = this.rechargeForm.get('paymentMethod')?.value;
      const rechargeRequest: RechargeRequest = {
        mobileNumber: mobileNumber,
        plan: this.selectedPlan,
        paymentMethod: paymentMethod
      };
  
      if (this.subscriber) {
        this.rechargeService.rechargeSubscriber(rechargeRequest, this.subscriber).subscribe(
          (recharge) => {
            console.log('Recharge successful:', recharge);
            this.rechargeService.saveRecharge(recharge).subscribe(
              (savedRecharge) => {
                console.log('Recharge saved successfully:', savedRecharge);
                if (this.subscriber!.email && this.selectedPlan) {
                  this.sendRechargeEmail(this.subscriber!.email, mobileNumber, this.selectedPlan.name, this.selectedPlan.price);
                } else {
                  console.log('Subscriber email or selected plan is null');
                }
                this.showSuccessMessageWithTimeout();
              },
              (error) => {
                console.log('Error saving recharge:', error);
                this.showErrorMessageWithTimeout('Error saving recharge');
              }
            );
          },
          (error) => {
            console.log('Error during recharge:', error);
            this.showErrorMessageWithTimeout('Error during recharge');
          }
        );
      } else {
        console.log('Subscriber is null');
        this.showErrorMessageWithTimeout('Subscriber is null');
      }
    } else {
      // Handle invalid form or missing data
      this.showErrorMessageWithTimeout('Please fill in all required fields and select a plan and payment method');
    }
  }

  sendRechargeEmail(subscriberEmail: string, mobileNumber: string, planName: string, planPrice: number) {
    if (this.selectedPlan) {
      this.rechargeService.sendRechargeEmail(subscriberEmail, mobileNumber, this.selectedPlan.name, this.selectedPlan.price).subscribe(
        (response) => {
          alert('Recharge Done Successfully! \n Recharge Invoice Has Been Sent To Your Registerd Email ID !');
        },
        (error) => {
          console.log('Error sending email:', error);
          this.showErrorMessageWithTimeout('Error sending email');
        }
      );
    } else {
      console.log('Selected plan is null');
    }
  }
}
