import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PostListComponent } from "../post-list/post-list.component";
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-main',
  imports: [MatTabsModule, PostListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  constructor(private userService: UserService) {}
}
