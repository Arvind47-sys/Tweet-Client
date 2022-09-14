import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  User,
  UserDetails,
} from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const _currentUserState = null;
const _allUsersState: UserDetails[] = [];

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'http://13.71.123.206/api/v1.0/tweets/';

  private currentUserStore = new BehaviorSubject<User>(_currentUserState);
  public currentUser$ = this.currentUserStore.asObservable();

  private allUsersStore = new BehaviorSubject<UserDetails[]>(_allUsersState);
  public allUsers$ = this.allUsersStore.asObservable();

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(loginModel: Login) {
    return this.http.post(this.baseUrl + 'login', loginModel).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserStore.next(user);
          this.initiateAutoLogOut(user);
          return user;
        }
      })
    );
  }

  initiateAutoLogOut(user: User) {
    const exp = JSON.parse(atob(user.token.split('.')[1])).exp;
    const expires = new Date(exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, timeout);
  }

  setCurrentUser(user: User) {
    this.currentUserStore.next(user);
  }

  getCurrentUser() {
    return this.currentUserStore.value;
  }

  logOut() {
    localStorage.removeItem('user');
    this.currentUserStore.next(_currentUserState);
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  getAllUsers() {
    this.http
      .get<UserDetails[]>(this.baseUrl + 'users/all')
      .subscribe((users) => {
        this.allUsersStore.next(
          users.filter((x) => x.username !== this.getCurrentUser()?.username)
        );
      });
  }

  registerUser(newUser: Register) {
    return this.http.post<User>(this.baseUrl + 'register', newUser).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserStore.next(user);
          this.initiateAutoLogOut(user);
          return user;
        }
      })
    );
  }

  forgotPassword(forgotPassword: ForgotPassword, username: string) {
    return this.http.post<boolean>(
      this.baseUrl + 'forgot/' + username,
      forgotPassword
    );
  }

  resetPassword(resetPassword: ResetPassword, email: string) {
    return this.http.post<boolean>(
      this.baseUrl + 'reset/' + email,
      resetPassword
    );
  }
}
