import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from './app/store/auth.store';
import { ToastMessage } from './app/service/toast-message';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const messageService = inject(ToastMessage);

  if (authStore.isLoggedIn()) {
    return true;
  } else {
    messageService.showToastMessage("Unauthorized please login.");
    router.navigate(['/login']);
    return false;
  }
};
