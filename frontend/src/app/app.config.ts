import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterLink, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(RouterLink),
    importProvidersFrom(FormsModule),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(FilterPipeModule),
    importProvidersFrom(OrderModule),
    importProvidersFrom(NgxPaginationModule),
    importProvidersFrom(CommonModule),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([tokenInterceptorInterceptor])),
  ]  
};
