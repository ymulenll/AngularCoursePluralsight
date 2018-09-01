import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    var auth = this.injector.get(AuthService)
    
    var authRequest = req.clone({
      headers: req.headers.set('Authorization', 'token ' + auth.token)
    })

    return next.handle(authRequest)
  }

  constructor(private injector: Injector) { }

}
