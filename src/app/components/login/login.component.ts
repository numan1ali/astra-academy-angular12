import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  Form,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/admin/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  invalidUser: boolean = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  items: MenuItem[] = [];
  str: string = 'student@gmail.com';
  passwrod: string = 'password3';
  loginForm!: FormGroup;
  user!: User;
  ngOnInit() {
    this.items = [];
    // this.getAllUsersData();
    this.ifLoggenInMoveToHome();
  }
  ifLoggenInMoveToHome() {
    if (this.authService.isLoggedIn()) {
      this.user = JSON.parse(this.authService.getUser() || '{}');
      this.router.navigate([`/${this.user.role}`]);
    }
  }
  get emailControl() {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }
  getAllUsersData() {
    this.authService.getAllUsersData().subscribe((data: User[]) => {});
  }
  authenticateUser() {
    this.authService
      .authenticatUser(this.emailControl.value, this.passwordControl.value)
      .subscribe((value) => {
        this.isLogin = value;
        if (this.isLogin) {
          this.invalidUser = false;
          this.user = JSON.parse(this.authService.getUser() || '{}');

          this.router.navigate([`/${this.user.role}`]);
          // this.router.navigate(['student']);
        } else {
          this.invalidUser = true;
        }
      });
  }
}
