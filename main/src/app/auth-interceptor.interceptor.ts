import { HttpInterceptorFn, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap, throwError } from 'rxjs';
import { AppContext } from './app.context';
import { environment } from '../environments/environment';


export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const toastr = inject(ToastrService);
  const context = inject(AppContext);
  const http = inject(HttpClient);

  const clonedReq = req.clone({ withCredentials: true });

  return next(clonedReq).pipe(

    catchError(err => {

      if (err.status === 401 && !req.url.includes(`${environment.baseUrl}/auth/refresh`)) {
        return http.post(`${environment.baseUrl}/auth/refresh`, {}, { withCredentials: true }).pipe(

          switchMap(() => next(clonedReq)),

          catchError((err) => {
            localStorage.removeItem("logData");
            context.logStatus = false;
            router.navigate(['/login']);
            toastr.error('Session expired. Please log in again.');
            return throwError(() => err);
          })
        );
      }
      return throwError(() => err);
    })
  );
};