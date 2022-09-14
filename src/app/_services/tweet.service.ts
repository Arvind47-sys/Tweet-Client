import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Like, Reply, Tweet } from '../models/tweet.model';

const _userTweetsState: Tweet[] = [];

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  baseUrl = 'http://13.71.123.206/api/v1.0/tweets/';

  private userTweetsStore = new BehaviorSubject<Tweet[]>(_userTweetsState);
  public userTweets$ = this.userTweetsStore.asObservable();

  constructor(private http: HttpClient) {}

  getAllTweetsOfUser(username: string) {
    this.http.get<Tweet[]>(this.baseUrl + username).subscribe((tweets) => {
      this.userTweetsStore.next(tweets);
    });
  }

  getAllTweets() {
    this.http.get<Tweet[]>(this.baseUrl + 'all').subscribe((allTweets) => {
      this.userTweetsStore.next(allTweets);
    });
  }

  likeTweet(username: string, tweetId: number, like: Like) {
    return this.http.post<boolean>(
      this.baseUrl + 'like/' + username + '/' + tweetId,
      like
    );
  }

  replyTweet(username: string, tweetId: number, reply: Reply) {
    return this.http.post<boolean>(
      this.baseUrl + 'reply/' + username + '/' + tweetId,
      reply
    );
  }

  postNewTweet(tweet: Tweet, username: string) {
    return this.http.post<boolean>(this.baseUrl + 'add/' + username, tweet);
  }
}
