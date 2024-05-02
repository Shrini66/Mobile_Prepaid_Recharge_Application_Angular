import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriberService } from '../subscriber.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate('3s ease-in-out'))
    ])
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string | null = null;
  messageState: string | null = null;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private subscriberService: SubscriberService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true; // Set loading state
      const subscriber = this.registerForm.value;
      this.subscriberService.registerSubscriber(subscriber).subscribe(
        (response) => {
          console.log('Registration successful');
          this.message = 'Registration successful';
          this.messageState = 'success';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        (error) => {
          console.log('Error during registration:', error);
          this.message = 'Error during registration';
          this.messageState = 'error';
          setTimeout(() => {
            this.message = null;
            this.messageState = null;
          }, 3000);
        }
      ).add(() => {
        this.loading = false; // Reset loading state after API call completes
      });
    }
  }
}
