import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const toastr = inject(ToastrService);

  const token = localStorage.getItem('token');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next(authReq).pipe(
      catchError(err => {

        if (err.status === 401) {
          localStorage.removeItem("token");
          router.navigate(['/login']);
          toastr.error('Session expired. Please log in again.');
        }
        
        return throwError(() => err);
      })
    )
  }

  return next(req);
};
