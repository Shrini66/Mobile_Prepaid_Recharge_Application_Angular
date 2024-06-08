import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SubscriberService } from '../subscriber.service';
import { Subscriber } from '../subscriber';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private subscriberService: SubscriberService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      this.authService.login(email, password).subscribe(
        (response: Subscriber | null) => {
          if (response) {
            if (email === 'admin@test.com' && password === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.subscriberService.setSubscriber(response);
              this.router.navigate(['/recharge']);
            }
          } else {
            this.loginError = true; // Set loginError to true to display error message
          }
        },
        (error) => {
          console.log('Error during login:', error);
          this.loginError = true; // Set loginError to true to display error message
        }
      );
    }
  }
}
