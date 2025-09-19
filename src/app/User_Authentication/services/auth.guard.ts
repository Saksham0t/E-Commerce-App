import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const dialog = inject(MatDialog);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    dialog.open(UserLoginComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container'
    });
    return false;
  }
};
