import { Component, computed, inject } from '@angular/core';
import { SpinnerStore } from '../store/spinner.store';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [MatProgressBarModule, CommonModule],
  template: `<mat-progress-bar mode="indeterminate" *ngIf="loading()"></mat-progress-bar>`
})
export class SpinnerComponent {
 private spinner = inject(SpinnerStore);
 loading = computed(() => this.spinner.loading$());
}
