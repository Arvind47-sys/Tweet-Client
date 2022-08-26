import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from '../models/tweet.model';
import { AccountService } from '../_services/account.service';
import { TweetService } from '../_services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private tweetService: TweetService,
    private toastr: ToastrService
  ) {}
  postTweetModel: Tweet = {} as Tweet;
  togglePostTweet: boolean = false;

  loggedInUserInfo$ = this.accountService.currentUser$;
  currentUser = this.accountService.getCurrentUser();

  ngOnInit(): void {}

  postNewTweet() {
    this.togglePostTweet = !this.togglePostTweet;
  }

  cancel() {
    this.postTweetModel = {} as Tweet;
    this.togglePostTweet = !this.togglePostTweet;
  }

  postTweet() {
    this.currentUser =
      this.currentUser === null
        ? this.accountService.getCurrentUser()
        : this.currentUser;
    this.tweetService
      .postNewTweet(this.postTweetModel, this.currentUser.username)
      .subscribe((isTweetPosted) => {
        if (isTweetPosted) {
          this.toastr.success('Tweet posted successfully');
          this.cancel();
        } else {
          this.toastr.error('Error in posting the tweet');
        }
        this.postTweetModel = {} as Tweet;
      });
  }
}
