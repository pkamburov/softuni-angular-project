import {
  Component,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Post } from '../types/post';
import { ApiService } from '../api.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ElapsedTimePipe } from '../shared/elapsed-time.pipe';

@Component({
  selector: 'app-post-list',
  imports: [LoaderComponent, ElapsedTimePipe, MatButtonModule, MatIconModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPosts(5).subscribe((posts) => {
      this.posts = posts;
      console.log(posts);
      this.isLoading = false;
    });
  }
}
