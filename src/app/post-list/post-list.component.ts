import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-post-list',
  imports: [MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {

}
