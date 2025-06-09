import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthStore } from './app/store/auth.store';
import { SpinnerStore } from './app/store/spinner.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);  
  const token = authStore.getToken();
  const spinner = inject(SpinnerStore);
  console.log(token);
  spinner.show();
  const clonedReq = token && authStore.isLoggedIn()
    ? req.clone({ setHeaders: { 'x-api-key': token } })
    : req;

  return next(clonedReq).pipe(
    finalize(() => spinner.hide())
  );
};
