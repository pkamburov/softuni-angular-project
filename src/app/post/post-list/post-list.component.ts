import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Post } from '../../types/post';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { UserService } from '../../user/user.service';
import { PostSingleComponent } from '../post-single/post-single.component';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-list',
  imports: [CommonModule, LoaderComponent, MatButtonModule, MatIconModule, PostSingleComponent],
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
    private userService: UserService,
    public postService: PostService
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
      }
    );
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

  onDeletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post._id !== postId);
        console.log('deleted');
      },
      error: err => {
        console.log('Error', err);
      }
    })
  }
}
