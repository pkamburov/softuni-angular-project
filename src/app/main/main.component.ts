import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PostListComponent } from "../post/post-list/post-list.component";
import { UserService } from '../user/user.service';
import { HeaderComponent } from '../core/header/header.component';
import { FooterComponent } from "../core/footer/footer.component";
@Component({
  selector: 'app-main',
  imports: [MatTabsModule, PostListComponent, HeaderComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  constructor(private userService: UserService) {}
}
