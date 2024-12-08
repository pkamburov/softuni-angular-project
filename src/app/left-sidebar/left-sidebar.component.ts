import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { UserService } from '../user/user.service';
import { PostCreateComponent } from '../post/post-create/post-create.component';

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

  get profile() {
    return this.userService.getProfile();
  }
  
  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}

  openPostDialog() {
    this.dialog.open(PostCreateComponent);
  }

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
