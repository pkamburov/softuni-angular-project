import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Post } from '../../types/post';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ElapsedTimePipe } from '../../shared/elapsed-time.pipe';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-post-list',
  imports: [LoaderComponent, ElapsedTimePipe, MatButtonModule, MatIconModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  @ViewChild('postContainer') postContainer!: ElementRef;
  posts: Post[] = [];
  currentPage = 1;
  limit = 8;
  isLoading = true;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
      this.loadPosts();
  }

  loadPosts(): void {
    this.apiService
      .getPosts(this.currentPage, this.limit)
      .subscribe((posts) => {
        this.posts = [...this.posts, ...posts];
        this.isLoading = false;
      });
  }

  loadMorePosts(): void {
    this.currentPage += 1;
    this.loadPosts();

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  }
}
