import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { request } from 'http';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth:AuthService,private router:Router) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const myToken = this.auth.getToken();
      if(myToken){
        request = request.clone({
          setHeaders: {Authorization: `Bearer ${myToken}` }
        })
      }

      return next.handle(request).pipe(
        catchError((err:any) => {
          if(err instanceof HttpErrorResponse && err.status === 401){
            alert('Your session has expired, please login again');
            this.router.navigate(['/login']);
          }
          return throwError(() => new Error("Something went wrong!") );
        }) 
      );
  }

};
