import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerComponent } from "../common/topmenu";

@Component({
  selector: 'app-dashboard',
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, SpinnerComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  cookieService = inject(CookieService);
  userName= this.cookieService.get('auth_user');   

}
