import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriberService } from './subscriber.service';
import { Subscriber } from './subscriber';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  isHomePage = true;

  constructor(
    private router: Router,
    private subscriberService: SubscriberService
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.router.events.subscribe((event) => {
      if (this.router.url === '/') {
        this.isHomePage = true;
      } else {
        this.isHomePage = false;
      }
    });
  }

  checkLoginStatus() {
    const subscriber = this.subscriberService.getSubscriber();
    if (subscriber) {
      this.isLoggedIn = true;
      if (subscriber.email === 'admin@test.com' && subscriber.password === 'admin') {
        this.isAdmin = true;
        this.isUser = false;
      } else {
        this.isAdmin = false;
        this.isUser = true;
      }
    } else {
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.isUser = false;
    }
  }

  logout() {
    this.subscriberService.removeSubscriber();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isUser = false;
    this.router.navigate(['/login']);
  }
}
