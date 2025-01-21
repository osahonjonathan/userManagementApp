import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  passwordFieldType: string = 'password';

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    console.log('hi');
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  check(){
    console.log('check')
  }

  login() {
    if (this.loginForm.valid) {
      const { username } = this.loginForm.value;

      localStorage.setItem('username', username);
      this.router.navigateByUrl(`/dashboard`);
    }
  }
}
