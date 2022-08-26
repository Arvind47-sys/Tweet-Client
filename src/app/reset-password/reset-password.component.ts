import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from '../models/user.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}
  resetPwdModel: ResetPassword = {} as ResetPassword;

  passwordMatch: boolean = true;
  confirmPassword: string;

  ngOnInit(): void {}

  cancel() {
    this.router.navigateByUrl('/');
  }

  confirmPwdChanged(value: string) {
    this.confirmPassword = value;
    if (this.resetPwdModel.newPassword !== value) {
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

  resetPassword() {
    this.accountService
      .resetPassword(this.resetPwdModel, this.resetPwdModel.email)
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
