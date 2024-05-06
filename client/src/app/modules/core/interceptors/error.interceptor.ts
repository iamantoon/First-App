import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status){
            case 400: 
              if (error.error.errors){
                const modalStateErrors = [];
                for (const key in error.error.errors){
                  if (error.error.errors[key]){
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                this.toastr.error(modalStateErrors.flat().join(','));
                throw modalStateErrors.flat();
              } else {
                this.toastr.error(error.error, error.status.toString());
              }
              break;
            case 401:
              this.toastr.error('Unauthorized', error.status.toString());
              break;
            case 404:
              this.toastr.error('Not Found', error.status.toString());
              break;
            case 500:
              this.toastr.error('Internal Server Error', error.status.toString());
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }
        throw error;
      })
    )
  }
}
