import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-left-sidebar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent {
  get isLoggedIn():boolean {
    return this.userService.isLoggedIn;
  }
  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}

  openLogInDialog() {
    this.dialog.open(LoginComponent);
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }

  onLogout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
