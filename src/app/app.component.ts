import { Component, ElementRef, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { AccountService } from './_services/account.service';
import { TweetService } from './_services/tweet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      'LightGray';
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }
}
