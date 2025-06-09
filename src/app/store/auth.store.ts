// auth.store.ts
import { computed, inject, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  cookieService = inject(CookieService);
  private token = signal<string | null>(null);
  private user = signal<string | null>(null);

  constructor() {
    const storedToken = this.cookieService.get('auth_token');
    if (storedToken) {
      this.token.set(storedToken)
    };

    const storedUser = this.cookieService.get('auth_user');
    if (storedUser) {
      this.user.set(storedUser);
    }
  }

  readonly isLoggedIn = computed(() => !!this.token());

  readonly getToken = computed(() => this.token());

  setAuth(token: string, user: string) {
    this.token.set(token);
    this.user.set(user);
    this.cookieService.set('auth_token', token, 1);
    this.cookieService.set('auth_user', user, 1);
  }

  logout() {
    this.token.set(null);
    this.user.set(null);
    this.cookieService.delete('auth_token', '/');
    this.cookieService.delete('auth_user', '/');
  }
}
