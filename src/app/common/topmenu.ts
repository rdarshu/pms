import { Component, inject } from '@angular/core';
import { ApiService } from '../service/api';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthStore } from '../store/auth.store';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-topmenu',
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, RouterModule],
  template: `<mat-toolbar color="primary border border-radius-0">
    <div style="display: flex; align-items: center;cursor: pointer;" routerLink="/dashboard">
        <div [innerHTML]="pmsLogoSvg"></div>
    </div>
    <button mat-button routerLink="/patient-list">Patient List</button>
    <span class="spacer"></span>
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
        <mat-icon>account_circle</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
        </button>
    </mat-menu>
</mat-toolbar>`,
  styles: `mat-toolbar {
  display: flex;
  align-items: center;

  .toolbar-title {
    font-size: 20px;
    font-weight: 500;
  }

  .spacer {
    flex: 1 1 auto;
  }
}
`
})
export class SpinnerComponent {
  sanitizer = inject(DomSanitizer);
  pmsLogoSvg: SafeHtml | "";
  cookieService = inject(CookieService);

  apiService = inject(ApiService);
  authStore = inject(AuthStore);
  router = inject(Router);
  userName: string;
  constructor() {
    const rawSvg = `
  <svg width="120" height="40" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect x="2" y="2" width="56" height="56" rx="10" fill="#3f51b5"/>
    <path d="M30 16v12M24 22h12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    <text x="70" y="38" font-family="Segoe UI, Roboto, sans-serif" font-size="28" fill="#3f51b5" font-weight="bold">
      PMS
    </text>
  </svg>
`;
    this.pmsLogoSvg = this.sanitizer.bypassSecurityTrustHtml(rawSvg);
    this.userName = this.cookieService.get('auth_user');

  }
  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }
}