import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { UserService } from '../user/user.service';
import { PostCreateComponent } from '../post/post-create/post-create.component';
import { UserForAuth } from '../types/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-left-sidebar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
})
export class LeftSidebarComponent implements OnInit {
  user: UserForAuth | null = null;
  profileImageUrl: string = '';
  userSubscription!: Subscription

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => {
      if (user) {
        this.profileImageUrl = user.imageUrl
        ? `${user.imageUrl}?timestamp=${new Date().getTime()}`
        : '/images/default-image.jpg';
      }
    })
  }

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

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
