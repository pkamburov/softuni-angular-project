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
  userId: string | null = null;
  currentPage = 1;
  limit = 8;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        if (user) {
          this.userId = user._id;
        }
      },
    });
    this.loadPosts();
  }

  like(postId: string): void {
    const post = this.posts.find((p) => p._id === postId);
    const userId = this.userService.getUserId();

    if (!post || !userId) {
      console.log('Post not found or user not logged in');
      return;
    }

    if (!post.likes.includes(userId)) {
      this.apiService.likePost(postId).subscribe({
        next: () => {
          post.likes.push(userId);
          post.likedByUser = true;
          console.log('Post liked');
        },
        error: (err) => console.log('Error liking post: ', err)
      });
    }
  }

  // loadPosts(): void {
  //   this.apiService
  //     .getPosts(this.currentPage, this.limit)
  //     .subscribe((posts) => {
  //       this.posts = [...this.posts, ...posts];
  //       this.isLoading = false;
  //     });
  // }

  removeLike(postId: string): void {
    const post = this.posts.find((p) => p._id === postId);
    const userId = this.userService.getUserId();

    if (!post || !userId) {
      console.log('Post not found or user not logged in');
      return;
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id !== userId);
      post.likedByUser = false;
      console.log('Like removed');
    }
  }

  loadPosts(): void {
    this.apiService
      .getPosts(this.currentPage, this.limit)
      .subscribe((posts) => {
        if (this.userId) {
          const updatedPosts = posts.map((post) => {
            post.likedByUser = post.likes.includes(this.userId!);
            return post;
          });
          this.posts = [...this.posts, ...updatedPosts]
        } else {
          this.posts = [...this.posts, ...posts];
        }
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
