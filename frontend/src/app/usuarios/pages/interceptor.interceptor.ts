import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const token = localStorage.getItem('token');
  const cloneRequest = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(cloneRequest);
};
