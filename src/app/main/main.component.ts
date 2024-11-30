import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PostListComponent } from "../post-list/post-list.component";

@Component({
  selector: 'app-main',
  imports: [MatTabsModule, PostListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
