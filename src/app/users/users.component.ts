import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../models/user.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  username: string;
  name: string;
  displayTweets: boolean = false;

  ngOnInit(): void {
    this.accountService.getAllUsers();
  }

  allUsers$ = this.accountService.allUsers$;

  viewTweets(user: UserDetails) {
    this.username = user.username;
    this.name = user.firstName + ' ' + user.lastName;
    this.displayTweets = true;
  }

  backToAllUsers(event: boolean) {
    this.displayTweets = event;
  }
}
