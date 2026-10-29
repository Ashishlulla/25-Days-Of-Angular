import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Http Request: ", req.method, req.url);
  return next(req).pipe(
    catchError((error: HttpErrorResponse)=>{
      console.error("Error Response", error.status, error.message);

      return throwError(()=>error)
    })
  );
};
