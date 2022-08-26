import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPassword } from '../models/user.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}
  forgotPwdModel: ForgotPassword = {} as ForgotPassword;
  passwordMatch: boolean = true;
  confirmPassword: string;

  ngOnInit(): void {}

  cancel() {
    this.router.navigateByUrl('/');
  }

  confirmPwdChanged(value: string) {
    this.confirmPassword = value;
    if (this.forgotPwdModel.newPassword !== value) {
      this.passwordMatch = false;
    } else {
      this.passwordMatch = true;
    }
  }

  newPasswordChanged(value: string) {
    if (value !== this.confirmPassword) {
      this.passwordMatch = false;
    } else {
      this.passwordMatch = true;
    }
  }

  forgotPassword() {
    this.accountService
      .forgotPassword(this.forgotPwdModel, this.forgotPwdModel.username)
      .subscribe((resp) => {
        if (resp) {
          this.toastr.success('Password is reset successfully');
          this.router.navigateByUrl('/');
        } else {
          this.toastr.error('Unable to reset password');
        }
      });
  }
}
