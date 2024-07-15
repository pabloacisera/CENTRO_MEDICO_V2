import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterLink, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptorInterceptor } from './token-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(RouterLink),
    importProvidersFrom(FormsModule),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([tokenInterceptorInterceptor])),
  ]  
};
