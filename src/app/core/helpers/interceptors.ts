import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "@core/helpers/auth-interceptor.interceptor";
import { ErrorInterceptor } from "@core/helpers/error.interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
