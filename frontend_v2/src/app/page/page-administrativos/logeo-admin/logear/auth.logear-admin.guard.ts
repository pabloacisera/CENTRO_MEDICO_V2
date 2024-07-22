import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardAdmin: CanActivateFn = () => {
  const router = inject(Router);
  const userData = localStorage.getItem('userData');
  if (userData) {
    // Si el usuario está autenticado, permitir la navegación
    return true;
  } else {
    // Si no está autenticado, redirigir al login
    router.navigate(['/home']);
    return false;
  }
};
