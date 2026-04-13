import { HttpInterceptorFn } from '@angular/common/http';

export const timingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
