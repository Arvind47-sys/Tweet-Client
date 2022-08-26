import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Like, Reply, Tweet } from '../models/tweet.model';
import { User } from '../models/user.model';
import { AccountService } from '../_services/account.service';
import { TweetService } from '../_services/tweet.service';

@Component({
  selector: 'app-all-tweets',
  templateUrl: './all-tweets.component.html',
  styleUrls: ['./all-tweets.component.css'],
})
export class AllTweetsComponent implements OnInit {
  replyToggle: boolean = false;
  likeToggle: boolean = false;
  currentTweet: Tweet = {} as Tweet;
  currentUser: User = {} as User;

  constructor(
    private tweetService: TweetService,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {}
  userTweets$ = this.tweetService.userTweets$;

  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser();
    this.tweetService.getAllTweets();
  }
  likeClicked(tweet: Tweet) {
    let like = tweet.likes.find((x) => x.likedBy == this.currentUser.username);
    if (!like) like = { likedBy: this.currentUser.username } as Like;
    this.tweetService
      .likeTweet(this.currentUser.username, tweet.tweetId, like)
      .subscribe((isLiked) => {
        if (isLiked) {
          this.tweetService.getAllTweets();
        } else {
          this.toastr.error('Error in liking the tweet');
        }
      });
  }

  replyClicked(currentTweet: Tweet) {
    this.likeToggle = false;
    if (this.replyToggle == true && this.currentTweet != currentTweet)
      this.replyToggle = !!this.replyToggle;
    else this.replyToggle = !this.replyToggle;
    this.currentTweet = currentTweet;
  }

  viewLikesClicked(currentTweet: Tweet) {
    this.replyToggle = false;
    if (this.likeToggle == true && this.currentTweet != currentTweet)
      this.likeToggle = !!this.likeToggle;
    else this.likeToggle = !this.likeToggle;
    this.currentTweet = currentTweet;
  }

  replied(replyValue: string, tweet: Tweet) {
    let reply = {
      repliedBy: this.currentUser.username,
      reply: replyValue,
    } as Reply;
    this.tweetService
      .replyTweet(this.currentUser.username, tweet.tweetId, reply)
      .subscribe((isReplied) => {
        if (isReplied) {
          this.tweetService.getAllTweets();
        } else {
          this.toastr.error('Error in replying the tweet');
        }
      });
  }
}
