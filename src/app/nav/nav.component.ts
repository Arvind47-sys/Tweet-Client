import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login, User } from '../models/user.model';
import { AccountService } from '../_services/account.service';
import { TweetService } from '../_services/tweet.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loginModel: Login = {} as Login;

  constructor(
    private accountService: AccountService,
    private tweetService: TweetService,
    private router: Router
  ) {}

  loggedInUser$ = this.accountService.currentUser$;

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.loginModel).subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/');
      }
      console.log(user);
    });
  }

  logout() {
    this.accountService.logOut();
  }

  resetPassword() {
    this.router.navigateByUrl('/forgot-password');
  }
}
