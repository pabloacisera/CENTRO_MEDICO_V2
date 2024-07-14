import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterLink, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(RouterLink),
    importProvidersFrom(FormsModule),
    importProvidersFrom(ReactiveFormsModule)
  ]
};
