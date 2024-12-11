import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { HttpClient } from '@angular/common/http';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FooterComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    AuthenticateComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'softuni-angular-project';
  
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    
  }
}
