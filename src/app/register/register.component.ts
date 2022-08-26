import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from '../models/user.model';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerModel: Register = {} as Register;
  @ViewChild('registerForm') registerForm: NgForm;
  passwordMatch: boolean = true;
  isUserNameTaken: boolean = false;
  isEmailUsed: boolean = false;
  confirmPassword: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  register() {
    this.accountService.registerUser(this.registerModel).subscribe((user) => {
      if (user) {
        this.toastr.success('User is registered and logged in');
        this.router.navigateByUrl('/');
      } else this.toastr.error('Unable to register user');
    });
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
  confirmPwdChanged(value: string) {
    this.confirmPassword = value;
    if (this.registerModel.password !== value) {
      this.passwordMatch = false;
    } else {
      this.passwordMatch = true;
    }
  }

  passwordChanged(value: string) {
    if (value !== this.confirmPassword) {
      this.passwordMatch = false;
    } else {
      this.passwordMatch = true;
    }
  }
}
