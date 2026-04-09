import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AppContext } from './app.context';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const toastr = inject(ToastrService);
  const context = inject(AppContext)

  const clonedReq = req.clone({
    withCredentials: true
  });

  return next(clonedReq).pipe(
    catchError(err => {

      if (err.status === 401) {
        localStorage.removeItem("logData");
        context.logStatus = false;
        router.navigate(['/login']);
        toastr.error('Session expired. Please log in again.');
      }

      return throwError(() => err);
    })
  )
};