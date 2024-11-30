import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { FooterComponent } from './core/footer/footer.component';
import { MainComponent } from "./main/main.component";
import { LeftSidebarComponent } from "./left-sidebar/left-sidebar.component";
import { RightSidebarComponent } from "./right-sidebar/right-sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MainComponent, LeftSidebarComponent, RightSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'softuni-angular-project';
}
