import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastMessage } from '../service/toast-message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api';
import { AuthStore } from '../store/auth.store';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  user: { email: string };
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  cookieService = inject(CookieService);
  messageService = inject(ToastMessage);
  apiService = inject(ApiService);
  authStore = inject(AuthStore);
  router = inject(Router);
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.authStore.logout();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.apiService.post<LoginResponse>('login', this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.authStore.setAuth(res.token, res.user.email);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.messageService.showToastMessage("Login failed. Please check your email and password.")
          console.error('Login failed:', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
