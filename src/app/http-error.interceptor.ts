import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errMessage = this.setError(error);
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errMessage,
          life: 3000,
        });
        return throwError(error.message);
      })
    );
  }
  setError(error: HttpErrorResponse): string {
    let errMessage = 'Woops! There was an error. See it on console.';
    if (error.error instanceof ErrorEvent) {
      // client side errors
      errMessage = `${error.error.message}. See error details on console.`;
    } else {
      // server side errors
      if (error.status !== 0) {
        errMessage = `${error.error}. See error details on console.`;
      } else {
        errMessage = 'Server is down.';
      }
    }
    return errMessage;
  }
}
