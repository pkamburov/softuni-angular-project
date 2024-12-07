import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../types/post';
import { ApiService } from '../api.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ElapsedTimePipe } from '../shared/elapsed-time.pipe';

@Component({
  selector: 'app-post-list',
  imports: [LoaderComponent, ElapsedTimePipe, MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
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

  // TODO: Fix dependancy issues, install format library, and edit formatTime()
  // formatTime(timestamp: any): string {
  //   const postDate = timestamp.toDate();
  //   const now = new Date();
  //   const diff = now.getTime() - postDate.getTime();

  //   const seconds = Math.floor(diff / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);
  //   const weeks = Math.floor(days / 7);

  //   if (seconds < 60) return 'Now';
  //   if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  //   if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  //   if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  //   return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  // }

  // countLikes(likes: any[]): number {
  //   return likes?.length || 0;
  // }

  // getAuthor(id: string) {}
}
