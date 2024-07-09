import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const autenticacionGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  
  if (token) {
    return true;
  } else {
    router.navigate(['/logear']);
    return false;
  }
};
