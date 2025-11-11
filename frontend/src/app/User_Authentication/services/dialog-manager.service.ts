import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login';
import { UserSignupComponent } from '../user-signup/user-signup';
 
 
@Injectable({ providedIn: 'root' })
export class DialogManagerService {
  private loginDialogRef: MatDialogRef<UserLoginComponent> | null = null;
  private signupDialogRef: MatDialogRef<UserSignupComponent> | null = null;
 
  constructor(private dialog: MatDialog) {}
 
  openLogin(): void {
    if (this.loginDialogRef) return;
 
    if (this.signupDialogRef) {
      this.signupDialogRef.close();
      this.signupDialogRef = null;
    }
 
    this.loginDialogRef = this.dialog.open(UserLoginComponent, {
      width: '350px',
      disableClose: false,
    });
 
    this.loginDialogRef.afterClosed().subscribe((result: any) => {
      this.loginDialogRef = null;
      if (result === 'open-signup') {
        this.openSignup();
      }
    });
  }
 
  openSignup(): void {
    if (this.signupDialogRef) return;
 
    if (this.loginDialogRef) {
      this.loginDialogRef.close();
      this.loginDialogRef = null;
    }
 
    this.signupDialogRef = this.dialog.open(UserSignupComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      disableClose: false,
    });
 
    this.signupDialogRef.afterClosed().subscribe((result: any) => {
      this.signupDialogRef = null;
      if (result === 'open-login') {
        this.openLogin();
      }
    });
  }
}