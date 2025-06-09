import { inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastMessage {
 private snackBar = inject(MatSnackBar);
 constructor() {}
 showToastMessage(message: string) {
  this.snackBar.open(message, 'X', {
    duration: 3000,
    verticalPosition: 'top',      
    horizontalPosition: 'center', 
  });
}
}
